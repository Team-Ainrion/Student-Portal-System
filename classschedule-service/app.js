const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const scheduleRoutes = require("./routes/scheduleRoutes");

dotenv.config(); // Load .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/schedule", scheduleRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error(" MongoDB Connection Error:", err));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});

