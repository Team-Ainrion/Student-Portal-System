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
});
