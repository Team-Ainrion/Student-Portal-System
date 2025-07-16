const mongoose = require("mongoose");

const userPreferenceSchema = new mongoose.Schema({
  userId: String,
  preferredChannels: [String]  // e.g. ['email', 'sms']
});

module.exports = mongoose.model("UserPreference", userPreferenceSchema);
