const express = require("express");
const router = express.Router();
const {
  getSchedule,
  createSchedule
} = require("../controllers/scheduleController");

// API: GET /schedule/:studentId
router.get("/:studentId", getSchedule);

// API: POST /schedule
router.post("/", createSchedule);

module.exports = router;
