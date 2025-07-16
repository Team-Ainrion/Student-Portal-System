const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const reportRoutes = require("./routes/reportRoutes");

// Initialize express
const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Route Mounting
app.use("/api/admin", studentRoutes);
app.use("/api/admin", courseRoutes);
app.use("/api/admin", facultyRoutes);
app.use("/api/admin", reportRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("✅ Admin Service is running...");
});

// Start server
const PORT = process.env.PORT || 5008;
app.listen(PORT, () => {
  console.log(`✅ Admin Service running on port ${PORT}`);
});
