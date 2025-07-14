const mongoose = require("mongoose");

const usageLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: "Resource" },
  accessedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UsageLog", usageLogSchema);
