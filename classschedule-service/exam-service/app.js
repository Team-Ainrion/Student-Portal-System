const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const examRoutes = require("./routes/examRoutes");

connectDB();

const app = express();
app.use(express.json());
app.use("/api/exams", examRoutes);

module.exports = app;