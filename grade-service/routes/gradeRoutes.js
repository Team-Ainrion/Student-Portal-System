const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/gradeController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, gradeController.addGrade);
router.get("/student/:studentId", auth, gradeController.getGradesByStudent);
router.patch("/submit/:id", auth, gradeController.submitGrades);

module.exports=router;