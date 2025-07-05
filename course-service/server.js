// server.js
const app = require("./app");
const connectDB = require("./config/db");
require("dotenv").config();

const PORT = process.env.PORT || 5002;

// Connect to MongoDB first
connectDB();

// Then start the server
app.listen(PORT, () => {
  console.log(`🚀 Course Service running on port ${PORT}`);
});
