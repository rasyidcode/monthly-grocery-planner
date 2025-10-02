"use strict";

const express = require("express");
const pool = require("../db/pool");
const { authMiddleware } = require("../utils/auth");
const router = express.Router();

// get all under plan
router.get("/:planId/items", authMiddleware, async (req, res) => {
  const { planId } = req.params;
  const result = await pool.query(
    `SELECT
        i.id, i.name, i.qty, i.price
    FROM items i
    LEFT JOIN plans p
        ON i.plan_id = p.id
    WHERE i.plan_id = $1 AND p.user_id = $2`,
    [planId, req.user.id]
  );
  res.json(result.rows);
});

// create
router.post("/:planId/items", authMiddleware, async (req, res) => {
  const { planId } = req.params;
  const plan = await pool.query(
    "SELECT * FROM plans WHERE id = $1 AND user_id = $2",
    [planId, req.user.id]
  );
  console.log("logged user", req.user);
  console.log(plan.rows);
  res.send("test");
  return;
  const { name, qty, price } = req.body;
  try {
    const result = await pool.query(
      `
      INSERT INTO items
          (plan_id, name, qty, price)
      VALUES
          ($1, $2, $3, $4) RETURNING *`,
      [planId, name, qty, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create item" });
  }
});

// delete
router.delete("/:planId/items/:itemId", authMiddleware, async (req, res) => {
  const { planId, itemId } = req.params;
  const result = await pool.query(
    "DELETE FROM items WHERE id = $1 AND plan_id $2 RETURNING *",
    [itemId, planId]
  );
  if (result.rows.length === 0)
    return res.status(404).json({ error: "Not found" });
  res.status(204).end();
});

module.exports = router;
