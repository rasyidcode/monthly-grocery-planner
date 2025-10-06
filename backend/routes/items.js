"use strict";

const express = require("express");
const pool = require("../db/pool");
const router = express.Router();
const createError = require("http-errors");

// get all under plan
router.get("/:planId/items", async (req, res) => {
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
router.post("/:planId/items", async (req, res, next) => {
  const { planId } = req.params;
  const plan = await pool.query(
    "SELECT * FROM plans WHERE id = $1 AND user_id = $2",
    [planId, req.user.id]
  );
  if (!plan.rows[0]) {
    next(createError(400, "Bad request"));
    return;
  }

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
    next(createError(500, "Could not create item"));
  }
});

// delete
router.delete("/:planId/items/:itemId", async (req, res) => {
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
