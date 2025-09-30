require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const pg = require("pg");
const cors = require("cors");
const pool = require("./db/pool");
const bcrypt = require("bcrypt");
const { generateToken, authMiddleware } = require("./utils/auth");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

// ---> health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// ---> auth route
app.post("/api/register", async (req, res) => {
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
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  const token = generateToken(user);
  res.json({ token, user: { id: user.id, email: user.email } });
});
app.get("/api/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
