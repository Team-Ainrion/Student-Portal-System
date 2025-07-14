const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const documentRoutes = require("./routes/documentRoutes");
const path = require("path");
const fs = require("fs");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

app.use("/uploads", express.static("uploads"));
app.use("/api/documents", documentRoutes);

module.exports = app;
