const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Dummy admin credentials (better: store in DB)
const ADMIN_EMAIL = "admin@neotok.com";
const ADMIN_PASSWORD = "123456";

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
