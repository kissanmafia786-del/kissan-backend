const mongoose = require("mongoose");

const txSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["earn","withdraw","refund"], required: true },
  amount: { type: Number, required: true },
  ref: String,
  meta: Object
}, { timestamps: true });

module.exports = mongoose.models.Transaction || mongoose.model("Transaction", txSchema);
