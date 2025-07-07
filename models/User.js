const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: {
    type: String,
    enum: ["student", "faculty", "admin"],
    default: "student"
  }
});

module.exports = mongoose.model("User", UserSchema);
