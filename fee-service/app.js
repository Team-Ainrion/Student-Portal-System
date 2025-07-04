const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const feeRoutes = require("./routes/feeRoutes");

dotenv.config();


const app = express();
app.use(express.json());
app.use("/api/fees", feeRoutes);

module.exports = app;
