const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const gradeRoutes = require("./routes/gradeRoutes");

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use("/api/grades", gradeRoutes);

module.exports=app;