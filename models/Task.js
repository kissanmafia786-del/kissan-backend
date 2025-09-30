const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    reward: { type: Number, required: true }, // coins ya points
    type: { type: String, enum: ["ad", "task"], required: true }, // ad = ads watching, task = complete tasks
    link: { type: String }, // optional link for ads or tasks
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Task || mongoose.model("Task", taskSchema);

