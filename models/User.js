const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// .env load
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ================= USER MODEL =================
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

// ================= ADMIN ROUTES =================
function isAdmin(req, res, next) {
  const role = req.headers["x-role"];
  if (role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
}

app.get("/api/admin/users", isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/admin/dashboard", isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });
    res.json({
      message: "Admin Dashboard",
      stats: { users: totalUsers, admins: totalAdmins }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= DEFAULT ROUTE =================
app.get("/", (req, res) => {
  res.send("🚀 Kissan Backend Server Running...");
});

// ================= MONGO CONNECT =================
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

