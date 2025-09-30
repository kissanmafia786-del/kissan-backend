const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  reward: Number,
  status: { type: String, default: "active" }
});

module.exports = mongoose.models.Ad || mongoose.model("Ad", adSchema);
