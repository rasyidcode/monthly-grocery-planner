const express = require("express");
const pool = require("../db/pool");
require("../utils/auth");
const router = express.Router();

// get all
router.get("/", async (req, res) => {
  const { year, month } = req.query;
  try {
    let query = `
    SELECT
      p.id, p.month, p.year, p.status,
      COALESCE(
        json_agg(
          json_build_object(
            'id', i.id,
            'name', i.name,
            'qty', i.qty,
            'price', i.price
          )
        ) FILTER (WHERE i.id IS NOT NULL), '[]'
      ) AS items
    FROM plans p
    LEFT JOIN items i ON p.id = i.plan_id
    WHERE p.user_id = $1
  `;
    let values = [req.user.id];
    if (year) {
      query += " AND p.year=$2";
      values.push(year);
      if (month) {
        query += " AND p.month=$3";
        values.push(month);
      }
    }
    query += " GROUP BY p.id ORDER BY p.year DESC, p.month DESC;";

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// get one
router.get("/:planId", async (req, res) => {
  const { planId } = req.params;
  const result = await pool.query(
    "SELECT * FROM plans WHERE id = $1 AND user_id = $2",
    [planId, req.user.id]
  );
  if (!result.rows.length)
    return res.status(404).json({ error: "Plan not found" });
  res.json(result.rows[0]);
});

// create
router.post("/", async (req, res) => {
  const { month, year } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO plans (user_id, month, year) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, month, year]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === "23505") {
      return res
        .status(400)
        .json({ error: "Plan already exist for the month" });
    }
    res.status(500).json({ error: "Could not create plan" });
  }
});

// update
router.put("/:planId", async (req, res) => {
  const { month, year, status } = req.body;
  const { planId } = req.params;
  try {
    const result = await pool.query(
      `UPDATE plans
        SET month = $1,
            year = $2,
            status = $3
        WHERE
          user_id = $4 AND id = $5 RETURNING *`,
      [month, year, status, req.user.id, planId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Could not update plan" });
  }
});

// patch
router.patch("/:planId", async (req, res) => {
  const { month, year, status } = req.body;
  const { planId } = req.params;
  try {
    const result = await pool.query(
      `UPDATE plans
        SET month = COALESCE($1, month),
            year = COALESCE($2, year),
            status = COALESCE($3, status)
        WHERE
          user_id = $4 AND id = $5 RETURNING *
      `,
      [month ?? null, year ?? null, status ?? null, req.user.id, planId]
    );
    if (result.rows.length === 0) res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not patch the plan" });
  }
});

// delete
router.delete("/:planId", async (req, res) => {
  const result = await pool.query(
    "DELETE FROM plans WHERE id = $1 RETURNING *",
    [req.params.planId]
  );
  if (result.rows.length === 0)
    return res.status(404).json({ error: "Not found" });
  res.status(204).end();
});

module.exports = router;
