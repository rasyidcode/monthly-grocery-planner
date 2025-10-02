const express = require("express");
const pool = require("../db/pool");
const { authMiddleware } = require("../utils/auth");
const router = express.Router();

// get all
router.get("/", authMiddleware, async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM plans WHERE user_id = $1 ORDER BY year DESC, month DESC",
    [req.user.id]
  );
  res.json(result.rows);
});

// get one
router.get("/:planId", authMiddleware, async (req, res) => {
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
router.post("/", authMiddleware, async (req, res) => {
  const { month, year } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO plans (user_id, month, year) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, month, year]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === "23505") {
      return res
        .status(400)
        .json({ error: "Plan already exist for this month" });
    }
    res.status(500).json({ error: "Could not create plan" });
  }
});

// update
router.put("/:planId", authMiddleware, async (req, res) => {
  const { planId } = req.params;
  const { month, year, status } = req.body;

  try {
    const result = {}
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update plan" });
  }
});

// delete
router.delete("/:planId", (req, res) => {
  res.json({ message: "delete" });
});

module.exports = router;
