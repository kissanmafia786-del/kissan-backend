const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

// ✅ User Stats API (sahi tarike se middleware lagao)
router.get("/stats", authMiddleware(["admin"]), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ active: true });
    const admins = await User.countDocuments({ role: "admin" });

    res.json({ totalUsers, activeUsers, admins });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

