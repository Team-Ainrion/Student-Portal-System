const express = require("express");
const router = express.Router();
const {
  addRecord,
  getRecordsByStudent,
} = require("../controllers/academicController");

router.post("/add", addRecord);
router.get("/:studentId", getRecordsByStudent);

module.exports = router;
