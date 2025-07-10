const express = require("express");
const app = express();
const calendarRoutes = require("./routes/calendarRoutes");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/calendar", calendarRoutes);

module.exports=app;