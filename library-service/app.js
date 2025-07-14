

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const resourceRoutes = require("./routes/resourceRoutes");
const verify = require("./middleware/auth");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ Correct way
app.use("/api/resources", resourceRoutes); // ✅ This should be a router

app.use("/api/resources", verify, resourceRoutes);  // middleware then router

module.exports = app;