const express = require('express');
const router = express.Router();
const { Task, User, Transaction } = require('../models');

// GET /api/task/list?country=PK
router.get('/list', async (req, res) => {
  const country = req.query.country || '';
  const tasks = await Task.find(country ? { countryCodes: country } : {}).limit(50);
  res.json(tasks);
});

// POST /api/task/complete
// body: { userId, taskId }
router.post('/complete', async (req, res) => {
  try {
    const { userId, taskId } = req.body;
    const task = await Task.findById(taskId);
    if(!task) return res.status(404).json({ error: 'task not found' });

    // For simplicity: credit points as money directly. In production convert points -> currency.
    const amount = Number(task.points || 0);
    if(amount > 0) {
      await Transaction.create({ userId, type: 'credit', source: 'task', amount, meta: { taskId } });
      await User.findByIdAndUpdate(userId, { $inc: { walletBalance: amount, totalEarned: amount } });
    }
    res.json({ ok:true, credited: amount });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;