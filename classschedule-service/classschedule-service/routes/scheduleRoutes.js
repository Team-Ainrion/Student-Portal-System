

const express = require("express");
const router = express.Router();

const {
  createSchedule,
  getStudentSchedule,
  getFacultySchedule,
  updateSchedule,
  deleteSchedule
} = require("../controllers/scheduleController");

const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.post("/", auth, role("admin", "faculty"), createSchedule);


router.get("/student/:studentId", auth, role("student", "admin"), getStudentSchedule);


router.get("/faculty/:faculty", auth, role("faculty", "admin"), getFacultySchedule);

router.put("/:id", auth, role("admin"), updateSchedule);


router.delete("/:id", auth, role("admin"), deleteSchedule);

module.exports = router;
