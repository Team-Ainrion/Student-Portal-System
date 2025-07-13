const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const attendanceRoutes = require("./routes/attendanceRoutes");

dotenv.config();
const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB Error:", err));

// Routes
app.use("/api/attendance", attendanceRoutes);

module.exports=app;