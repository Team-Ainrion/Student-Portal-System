<<<<<<< HEAD
require("dotenv").config();
const express = require("express");
const http = require("http");
const connectDB = require("./config/db");
const notificationRoutes = require("./routes/notificationRoutes");
const { initNotificationSockets } = require("./sockets/notificationSocket");

connectDB();

const app = express();
const server = http.createServer(app);
initNotificationSockets(server);

app.use(express.json());
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
  console.log(`🚀 Notification service running on port ${PORT}`);
=======
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5014;

app.listen(PORT, () => {
  console.log(`🔔 Notification Service is running on port ${PORT}`);
>>>>>>> 44b78a3b0c5191458a605dc3d786734611ff4c51
});
