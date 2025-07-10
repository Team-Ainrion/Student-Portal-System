const Message = require("../models/message");

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

