const express = require('express');
const router = express.Router();
const { AdImpression, Transaction, User } = require('../models');

// POST /api/ad/impression
router.post('/impression', async (req, res) => {
  try {
    const { userId, adProvider, event, revenueReported } = req.body;
    if(!userId || typeof revenueReported !== 'number') return res.status(400).json({ error: 'missing' });

    const imp = await AdImpression.create({ userId, adProvider, event, revenueReported });

    const userShare = Number((revenueReported * 0.5).toFixed(6));
    const platformShare = Number((revenueReported * 0.5).toFixed(6));

    await Transaction.create({
      userId,
      type: 'credit',
      source: 'ad',
      amount: userShare,
      meta: { adImpressionId: imp._id }
    });

    await User.findByIdAndUpdate(userId, {
      $inc: { walletBalance: userShare, totalEarned: userShare }
    });

    await Transaction.create({
      type: 'credit',
      source: 'ad_platform',
      amount: platformShare,
      meta: { adImpressionId: imp._id }
    });

    res.json({ ok:true, userShare, platformShare });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;