const express = require("express");
const router = express.Router();

const {
  createCourse,
  getAllCourses,
  assignFaculty
} = require("../controllers/courseController");

const { protect } = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.post("/courses", protect, role("admin"), createCourse);
router.get("/courses", protect, role("admin"), getAllCourses);
router.put("/courses/:courseId/assign", protect, role("admin"), assignFaculty);

module.exports = router;
