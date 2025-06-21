// routes/courseRoutes.js
const express = require("express");
const router = express.Router();

const {
  addCourse,
  getCourses,
  enrollStudent
} = require("../controllers/courseController");

router.post("/add", addCourse);
router.get("/all", getCourses);
router.post("/enroll", enrollStudent);

module.exports = router;