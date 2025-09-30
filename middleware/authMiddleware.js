const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware function
const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ error: "No token provided" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // User fetch
      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      // Role check
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ error: "Access denied" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
};

module.exports = authMiddleware;
