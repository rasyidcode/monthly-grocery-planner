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
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) next(createError(401, "No token provided"));

    const token = authHeader.split(" ")[1];
    if (!token) next(createError(401, "Invalid token format"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return next(createError(403, "Invalid or expired token"));
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { generateToken, authMiddleware };
