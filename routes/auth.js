const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, country } = req.body;
    if(!email && !phone) return res.status(400).json({ error: 'email or phone required' });
    const existing = email ? await User.findOne({ email }) : null;
    if(existing) return res.status(400).json({ error: 'email taken' });
    const hash = password ? await bcrypt.hash(password, 10) : '';
    const u = await User.create({ name, email, phone, passwordHash: hash, country });
    const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
    res.json({ ok:true, token, user: { id: u._id, name: u.name, country: u.country } });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// POST /api/auth/login (email/password)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ error: 'missing' });
    const u = await User.findOne({ email });
    if(!u) return res.status(400).json({ error: 'invalid' });
    const valid = await bcrypt.compare(password, u.passwordHash || '');
    if(!valid) return res.status(400).json({ error: 'invalid' });
    const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
    res.json({ ok:true, token, user: { id: u._id, name: u.name, country: u.country } });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
