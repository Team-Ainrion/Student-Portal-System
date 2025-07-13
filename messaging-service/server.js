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
});
