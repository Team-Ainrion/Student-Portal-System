const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const announcementRoutes = require("./routes/announcementRoutes");

// Use routes
app.use("/api/announcements", announcementRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server on PORT 5012
const PORT = process.env.PORT || 5012;
app.listen(PORT, () => {
  console.log(`📢 Announcement Service is running on port ${PORT}`);
});
