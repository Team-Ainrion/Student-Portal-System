const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const academicRoutes = require("./routes/academicRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/records", academicRoutes);

module.exports = app;
