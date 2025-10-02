// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const adRoutes = require("./routes/ads");
// env setup
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// 🔹 Import Routes
const authRoutes = require("./routes/auth");     // login/register
const taskRoutes = require("./routes/tasks");   // tasks CRUD
const adsRoutes = require("./routes/ads");      // ads CRUD
const walletRoutes = require("./routes/wallet");// wallet system
const adminRoutes = require("./routes/admin");  // admin panel routes

// 🔹 Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/ads", adsRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/admin", adminRoutes);
app.user("/api/ads", adRoutes);
// 🔹 Root Test Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running | Powered by Kissan Software");
});

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

