const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getStudentRecords,
  getTranscript,
  getGPA,
  createAcademicRecord // ✅ new controller
} = require("../controllers/academicController");

router.get("/records", auth, getStudentRecords);
router.get("/transcript", auth, getTranscript);
router.get("/gpa", auth, getGPA);
router.post("/add", auth, createAcademicRecord); // ✅ correct place

module.exports = router;

