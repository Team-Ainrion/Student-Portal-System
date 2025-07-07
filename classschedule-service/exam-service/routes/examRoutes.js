const express = require("express");
const router = express.Router();
const {
  createExam,
  getExams,
  registerStudent
} = require("../controllers/examController");

router.post("/create", createExam);
router.get("/all", getExams);
router.post("/register", registerStudent);

module.exports = router;