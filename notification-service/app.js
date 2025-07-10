const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const notificationRoutes = require("./routes/notificationRoutes");

dotenv.config();
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notifications", notificationRoutes);

module.exports = app;
