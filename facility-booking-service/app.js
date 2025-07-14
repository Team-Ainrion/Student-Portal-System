const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api/bookings", bookingRoutes);

module.exports = app;
