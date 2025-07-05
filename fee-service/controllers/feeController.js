const FeeRecord = require("../models/FeeRecord");
const generateReceipt = require("../utils/receiptGenerator");



// View Fee Statement
exports.getFeeStatement = async (req, res) => {
  try {
    const { studentId } = req.params;
    const feeRecord = await FeeRecord.findOne({ studentId });

    if (!feeRecord) return res.status(404).json({ message: "Fee record not found" });

    res.json(feeRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.addFeeStatement = async (req, res) => {
  try {
    const { studentId, semester, totalFee, scholarships  } = req.body;

    const feeRecord = new FeeRecord({
      studentId,
      semester,
      totalFee,
      scholarships,
      amountPaid: 0,
      dueAmount: totalFee,
      scholarships
    });

    await feeRecord.save();
    res.status(201).json({ message: "Fee record created", feeRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Make a Payment (Simulated)
exports.makePayment = async (req, res) => {
  try {
    const { studentId, amount, method } = req.body;
    const feeRecord = await FeeRecord.findOne({ studentId });

    if (!feeRecord) return res.status(404).json({ message: "Fee record not found" });

    const transactionId = "TXN" + Date.now();

    // Initialize fields if they are undefined
    feeRecord.amountPaid = feeRecord.amountPaid || 0;
    feeRecord.totalFee = feeRecord.totalFee || 0;

    // Push payment details
    feeRecord.paymentHistory.push({
      amount,
      date: new Date(),
      method,
      transactionId
    });

    // Recalculate paid and due
    feeRecord.amountPaid += amount;
    feeRecord.dueAmount = feeRecord.totalFee - feeRecord.amountPaid;

    await feeRecord.save();

    const receipt = generateReceipt(studentId, amount, method, transactionId);

    res.status(200).json({ message: "Payment successful", transactionId, receipt });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Payment History
exports.getPaymentHistory = async (req, res) => {
  try {
    const { studentId } = req.params;
    const feeRecord = await FeeRecord.findOne({ studentId });

    if (!feeRecord) return res.status(404).json({ message: "Fee record not found" });

    res.json(feeRecord.paymentHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Scholarship & Aid Info
exports.getAidInfo = async (req, res) => {
  try {
    const { studentId } = req.params;
    const feeRecord = await FeeRecord.findOne({ studentId });

    if (!feeRecord) return res.status(404).json({ message: "Fee record not found" });

    res.json(feeRecord.scholarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
