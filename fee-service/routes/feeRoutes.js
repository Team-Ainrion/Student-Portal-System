const express = require("express");
const router = express.Router();
const Fee = require("../models/Fee");

const {
  getFeesByStudent,
  createFee,
  payFee,
  getTransactionHistory   
} = require("../controllers/feeController");
router.get("/history/:studentId", getTransactionHistory);

// Get fees for a student
router.get("/:studentId", async (req, res) => {
  try {
    const fees = await Fee.find({ studentId: req.params.studentId });
    res.status(200).json(fees);
  } catch (err) {
    res.status(500).json({ error: "Error fetching fee records" });
  }
});

// Create new fee record ✅
router.post("/create", async (req, res) => {
  try {
    const fee = new Fee(req.body);
    await fee.save();
    res.status(201).json(fee);
  } catch (err) {
    res.status(400).json({ msg: "Failed to create fee", error: err.message });
  }
});

// Simulate payment
router.post("/pay/:id", async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);
    if (!fee) return res.status(404).json({ msg: "Fee record not found" });

    fee.status = "paid";
    fee.paymentDate = new Date();
    fee.transactionId = "TXN" + Date.now();
    fee.receiptUrl = `https://fake-receipts.com/${fee._id}`;

    await fee.save();
    res.json({ msg: "Payment successful", fee });
  } catch (err) {
    res.status(500).json({ error: "Payment failed" });
  }
});

module.exports = router;
