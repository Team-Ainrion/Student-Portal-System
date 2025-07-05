const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");

// ✅ Load environment variables from .env
dotenv.config();



// ✅ Initialize Express app
const app = express();

// ✅ Middleware to parse JSON requests
app.use(express.json());

// ✅ Mount course routes
app.use("/api/courses", courseRoutes);

// ✅ Export app to use in server.js
module.exports = app;