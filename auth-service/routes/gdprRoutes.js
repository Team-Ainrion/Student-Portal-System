const express = require("express");
const router = express.Router();

const { exportData, deleteAccount } = require("../controllers/gdprController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/export-data", authMiddleware, exportData);
router.delete("/delete-account", authMiddleware, deleteAccount);

module.exports = router;