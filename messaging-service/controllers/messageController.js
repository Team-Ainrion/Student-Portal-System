const Message = require("../models/message");

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
