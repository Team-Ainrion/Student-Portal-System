const express = require("express");
const router = express.Router();
const verify  = require("../middleware/auth");
router.use(verify);
const {
  createBooking,
  getBookings,
  checkAvailability,
  approveBooking,
  createFacility
} = require("../controllers/bookingController");

router.post("/create", createBooking);
router.get("/", getBookings);
router.get("/availability", checkAvailability);
router.put("/approve/:id", approveBooking);
router.post("/facility", createFacility);

module.exports = router;