const express = require("express");
const router = express.Router();

const {
  createFaculty,
  getAllFaculty,
  getFacultyWorkload
} = require("../controllers/facultyController");

const { protect } = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.post("/faculty", protect, role("admin"), createFaculty);
router.get("/faculty", protect, role("admin"), getAllFaculty);
router.get("/faculty/:id/workload", protect, role("admin"), getFacultyWorkload);

module.exports = router;
