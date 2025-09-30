const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware with role protection
function authMiddleware(roles = []) {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);

      if (!req.user) {
        return res.status(404).json({ error: "User not found." });
      }

      // ✅ Role check
      if (roles.length > 0 && !roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Forbidden: Insufficient role" });
      }

      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };
}

module.exports = authMiddleware;
