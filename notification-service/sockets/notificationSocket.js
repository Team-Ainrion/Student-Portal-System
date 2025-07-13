const socketIO = require("socket.io");

let io;

function initNotificationSockets(server) {
  io = socketIO(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("⚡ Notification socket connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`👥 User joined room: ${userId}`);
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
}

function sendInAppNotification(userId, message) {
  if (io) {
    io.to(userId).emit("newNotification", message);
    console.log(`📦 Sent in-app notification to user: ${userId}`);
  }
}

module.exports = { initNotificationSockets, sendInAppNotification };
