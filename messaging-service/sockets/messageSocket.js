const { Server } = require("socket.io");

function initSockets(server) {
  const io = new Server(server, {
    cors: { origin: "*" } // Adjust in prod
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    // Join user's personal room by userId
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected");
    });
  });

  // Make io available in req
  server.on("request", (req, res) => {
    req.io = io;
  });

  console.log("✅ Socket.IO initialized");
}

module.exports = { initSockets };
