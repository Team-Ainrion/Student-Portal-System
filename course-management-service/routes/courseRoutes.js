const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, courseController.createCourse);
router.get("/", courseController.getCourses);
router.put("/:id", auth, courseController.updateCourse);
router.delete("/:id", auth, courseController.deleteCourse);

module.exports=router;