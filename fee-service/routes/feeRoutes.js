const express = require("express");
const router = express.Router();
const feeController = require("../controllers/feeController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/statement/:studentId", authMiddleware, feeController.getFeeStatement);
router.post("/pay", authMiddleware, feeController.makePayment);
router.get("/history/:studentId", authMiddleware, feeController.getPaymentHistory);
router.get("/aid/:studentId", authMiddleware, feeController.getAidInfo);
router.post("/add", authMiddleware, feeController.addFeeStatement);


module.exports = router;

