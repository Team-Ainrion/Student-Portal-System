const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAvailableCourses,
  registerForCourse,
  dropCourse,
  getStudentCourses,
  getStudentWaitlist
} = require("../controllers/courseController");

const auth = require("../middleware/authMiddleware");

//  Auth-protected routes
router.post("/create", auth, createCourse);
router.get("/available", auth, getAvailableCourses);
router.post("/register", auth, registerForCourse);
router.post("/drop", auth, dropCourse);

// Student dashboard routes
router.get("/my-courses", auth, getStudentCourses);
router.get("/my-waitlist", auth, getStudentWaitlist);

module.exports = router;
