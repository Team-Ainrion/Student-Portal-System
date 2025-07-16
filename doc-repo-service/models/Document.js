const mongoose = require("mongoose");


const documentSchema = new mongoose.Schema({
  title: String,
  uploadedBy: String,
  role: { type: String, enum: ["student", "faculty"] },
  filePath: String,
  fileName: String
}, { timestamps: true });

module.exports = mongoose.model("Document", documentSchema);
