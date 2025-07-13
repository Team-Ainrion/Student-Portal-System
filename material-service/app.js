const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const materialRoutes = require("./routes/materialRoutes");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/materials", materialRoutes);

module.exports=app;