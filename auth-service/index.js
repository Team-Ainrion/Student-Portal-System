const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log(" MongoDB connected"))
.catch((err) => console.error(" MongoDB error:", err));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const gdprRoutes = require("./routes/gdprRoutes");
app.use("/api/gdpr", gdprRoutes);


// Sample route
app.get("/", (req, res) => {
  res.send("Auth service is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Auth Service running on port ${PORT}`);
});