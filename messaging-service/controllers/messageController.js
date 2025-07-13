const Message = require("../models/message");

<<<<<<< HEAD
// Send message & notify receiver
exports.sendMessage = async (req, res) => {
  try {
    const filePaths = req.files ? req.files.map(file => file.path) : [];
    const { senderId, receiverId, content } = req.body;

    const newMessage = new Message({ senderId, receiverId, content, attachments: filePaths });
    const saved = await newMessage.save();

    // Emit real-time event to receiver
    req.io.to(receiverId).emit("new_message", saved);

    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to send message" });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const userId = req.params.userId;
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }]
    }).sort({ timestamp: -1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
=======
exports.sendMessage = async (req, res) => {
  try {
    const filePaths = req.files ? req.files.map(file => file.path) : [];

    const newMessage = new Message({
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
      content: req.body.content,
      attachments: filePaths
    });

    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: "Failed to send message with attachment." });
  }
};

>>>>>>> 44b78a3b0c5191458a605dc3d786734611ff4c51
