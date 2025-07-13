const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const auth = require("../middleware/authMiddleware");

router.post("/mark", auth, attendanceController.markAttendance);
router.get("/student/:studentId", auth, attendanceController.getAttendanceByStudent);
router.get("/course/:courseId", auth, attendanceController.getAttendanceByCourse);

module.exports=router;