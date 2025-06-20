// routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/add", courseController.addCourse);
router.get("/all", courseController.getCourses);
router.post("/enroll", courseController.enrollStudent);

module.exports = router;
