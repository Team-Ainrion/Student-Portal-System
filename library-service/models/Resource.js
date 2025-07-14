const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  url: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Resource", resourceSchema);
