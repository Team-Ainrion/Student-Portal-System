// app.js
const express = require("express");
const mongoose = require("mongoose");
const courseRoutes = require("./routes/courseRoutes");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use("/api/courses", courseRoutes);

module.exports = app;

// server.js
const app = require("./app");
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Course Service running on port ${PORT}`);
});
