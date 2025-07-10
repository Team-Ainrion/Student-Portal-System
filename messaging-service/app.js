const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// File serving for attachments
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/messages", messageRoutes);

module.exports = app;

