const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  content: String,
<<<<<<< HEAD
  attachments: [String],
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
=======
  attachments: [String], // file URLs or paths
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
>>>>>>> 44b78a3b0c5191458a605dc3d786734611ff4c51
