const express = require("express");
const router = express.Router();

const {
  generateStandardReport,
  exportData,
  analyticsDashboard
} = require("../controllers/reportController");

const { protect } = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.get("/report/standard", protect, role("admin"), generateStandardReport);
router.get("/report/export", protect, role("admin"), exportData);
router.get("/report/analytics", protect, role("admin"), analyticsDashboard);

module.exports = router;
