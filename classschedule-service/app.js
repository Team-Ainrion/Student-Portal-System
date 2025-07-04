
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const scheduleRoutes = require("./routes/scheduleRoutes");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

// Routes
app.use("/api/schedule", scheduleRoutes);

app.get("/", (req, res) => {
  res.send("Class Schedule Service is running");
});

module.exports = app;
