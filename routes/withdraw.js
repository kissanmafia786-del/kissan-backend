const express = require("express");
const router = express.Router();

// simple withdraw endpoint
router.post("/", (req, res) => {
  const { amount, method } = req.body;

  // allow only 3 methods
  const allowedMethods = ["Easypaisa", "JazzCash", "PayPal"];
  if (!allowedMethods.includes(method)) {
    return res.status(400).json({ error: "Invalid withdraw method" });
  }

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  res.json({
    ok: true,
    message: `Withdraw request of ${amount} via ${method} submitted successfully`
  });
});

module.exports = router;

