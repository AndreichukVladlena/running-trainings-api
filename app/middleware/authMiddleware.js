const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization required" });
  }

  jwt.verify(token, jwtSecret, (err, userData) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = userData;
    next();
  });
}

module.exports = authMiddleware;
