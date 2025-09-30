const express = require('express');
const router = express.Router();
const { User, Transaction } = require('../models');

// GET /api/wallet/me?userId=...
router.get('/me', async (req, res) => {
  const userId = req.query.userId;
  if(!userId) return res.status(400).json({ error: 'userId required' });
  const user = await User.findById(userId).select('-passwordHash');
  if(!user) return res.status(404).json({ error: 'user not found' });
  const nextPayoutDay = Number(process.env.NEXT_PAYOUT_DAY || 21);
  const now = new Date();
  const year = now.getFullYear(), month = now.getMonth();
  const nextPayoutDate = new Date(year, month, nextPayoutDay).toISOString().slice(0,10);
  res.json({ walletBalance: user.walletBalance, totalEarned: user.totalEarned, nextPayoutDate, userId: user._id });
});

// GET /api/wallet/history?userId=...
router.get('/history', async (req, res) => {
  const userId = req.query.userId;
  if(!userId) return res.status(400).json({ error: 'userId required' });
  const tx = await Transaction.find({ userId }).sort({ createdAt: -1 }).limit(200);
  res.json(tx);
});

module.exports = router;
