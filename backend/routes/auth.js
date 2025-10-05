const express = require("express");
const router = express.Router();
const pool = require("./../db/pool");
const bcrypt = require("bcrypt");
const { generateToken } = require("./../utils/auth");
const createError = require("http-errors");

// signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email",
      [name, email, hash]
    );
    const user = result.rows[0];
    const token = generateToken(user);
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "User already exist" });
  }
});

// signin
router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];
  if (!user) next(createError(400, "Invalid credentials"));

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) next(createError(400, "Invalid credentials"));

  const token = generateToken(user);
  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

module.exports = router;
