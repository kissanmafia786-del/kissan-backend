const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Ads Schema
const AdSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

const Ad = mongoose.models.Ad || mongoose.model("Ad", AdSchema);

// GET ads with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // ek page pe 5 ads
    const skip = (page - 1) * limit;

    const ads = await Ad.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ads" });
  }
});

// POST new ad (admin only)
router.post("/", async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const ad = new Ad({ title, description, image });
    await ad.save();
    res.json(ad);
  } catch (err) {
    res.status(500).json({ error: "Failed to create ad" });
  }
});

module.exports = router;

