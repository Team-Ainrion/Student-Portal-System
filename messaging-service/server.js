<<<<<<< HEAD
require('dotenv').config();              // <== Load .env first

const express = require("express");
const http = require("http");
const connectDB = require("./config/db"); // <== Import function
const messageRoutes = require("./routes/messageRoutes");
const { initSockets } = require("./sockets/messageSocket");
const path = require("path");

// Connect to MongoDB
connectDB();                            // <== Actually call it

const app = express();
const server = http.createServer(app);

// JSON parsing
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/messages", messageRoutes);

// Init sockets
initSockets(server);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Messaging service running on port ${PORT}`);
=======
const app = require("./app");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Define the port (from .env or fallback)
const PORT = process.env.PORT || 5013;

// Start the server
app.listen(PORT, () => {
  console.log(`💬 Messaging Service is running on port ${PORT}`);
>>>>>>> 44b78a3b0c5191458a605dc3d786734611ff4c51
});
