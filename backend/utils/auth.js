const jwt = require("jsonwebtoken");
const createError = require("http-errors");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function authMiddleware(req, res, next) {
  console.log(createError(401, "No token provided"));
  res.end("stop here");
  return;
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) throw new createError(401, "No token provided");

    const token = authHeader.split(" ")[1];
    if (!token) res.status(401).json({ error: "Invalid token format" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { generateToken, authMiddleware };
