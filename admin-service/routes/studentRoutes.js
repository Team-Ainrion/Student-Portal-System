const express = require("express");
const router = express.Router();

const {
  createStudent,
  getAllStudents,
  updateStudentStatus,
  enrollStudent,
  generateReport
} = require("../controllers/studentController");

const { protect } = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

// ✅ Admin-only routes
router.post("/students", protect, role("admin"), createStudent);
router.get("/students", protect, role("admin"), getAllStudents);
router.put("/students/:id/status", protect, role("admin"), updateStudentStatus);
router.post("/enroll", protect, role("admin"), enrollStudent);
router.get("/students/:id/report", protect, role("admin"), generateReport);

module.exports = router;
