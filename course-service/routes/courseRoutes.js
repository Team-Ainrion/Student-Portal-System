const express = require("express");
const router = express.Router();
const {
  createCourse,
  getAvailableCourses,
  registerForCourse,
  dropCourse
} = require("../controllers/courseController");

router.post("/create", createCourse);
router.get("/available", getAvailableCourses);
router.post("/register", registerForCourse);
router.post("/drop", dropCourse);

module.exports = router;
