const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: {
    type: String,
    enum: ["student", "faculty", "admin"],
    default: "student",
  },
  contact: String,
  address: String,
  department: String,
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);