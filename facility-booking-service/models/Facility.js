const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema({
  name: String,
  type: String, // lab, room, hall etc.
  capacity: Number
});

module.exports = mongoose.model("Facility", facilitySchema);

