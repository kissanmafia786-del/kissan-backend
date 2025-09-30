const mongoose = require("mongoose");

const wrSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ["jazzcash","easypaisa","bank"], default: "bank" },
  details: Object,
  status: { type: String, enum: ["pending","approved","rejected"], default: "pending" },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  note: String
}, { timestamps: true });

module.exports = mongoose.models.WithdrawRequest || mongoose.model("WithdrawRequest", wrSchema);

