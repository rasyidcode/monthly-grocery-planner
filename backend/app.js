require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { authMiddleware } = require("./utils/auth");

const app = express();

const authRoute = require("./routes/auth");
const plansRoute = require("./routes/plans");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});
app.use("/api/auth", authRoute);
app.use("/api/plans", plansRoute);

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
  res.json({ error: "something went wrong" });
});

module.exports = app;
