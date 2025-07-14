const Booking = require("../models/Booking");
const Facility = require("../models/Facility");

exports.createBooking = async (req, res) => {
  try {
    const { facilityId, date, startTime, endTime, bookedBy } = req.body;

    const existing = await Booking.findOne({
      facilityId,
      date,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
        { startTime: startTime },
        { endTime: endTime }
      ]
    });

    if (existing) return res.status(409).json({ msg: "Facility already booked for selected time" });

    const booking = new Booking({ facilityId, date, startTime, endTime, bookedBy });
    await booking.save();
    res.status(201).json({ msg: "Booking request submitted", booking });
  } catch (err) {
    res.status(500).json({ error: "Failed to create booking", details: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("facilityId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

exports.checkAvailability = async (req, res) => {
  try {
    const { facilityId, date } = req.query;
    const bookings = await Booking.find({ facilityId, date });
    res.json({ facilityId, date, bookings });
  } catch (err) {
    res.status(500).json({ error: "Failed to check availability" });
  }
};

exports.approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    res.json({ msg: "Booking approved", booking });
  } catch (err) {
    res.status(500).json({ error: "Approval failed" });
  }
};

exports.createFacility = async (req, res) => {
  try {
    const { name, type, capacity } = req.body;
    const facility = new Facility({ name, type, capacity });
    await facility.save();
    res.status(201).json({ msg: "Facility created", facility });
  } catch (err) {
    res.status(500).json({ error: "Failed to create facility", details: err.message });
  }
};
