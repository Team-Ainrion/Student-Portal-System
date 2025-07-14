const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  facilityId: { type: mongoose.Schema.Types.ObjectId, ref: "Facility" },
  date: String,
  startTime: String,
  endTime: String,
  bookedBy: String,
  approved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);