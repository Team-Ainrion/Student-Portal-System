const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  method: { type: String, required: true },
  transactionId: { type: String, required: true }
});

const feeRecordSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  semester: { type: String },
  totalFee: { type: Number, required: true },
  amountPaid: { type: Number, default: 0 },      // ✅ Default value to avoid NaN
  dueAmount: { type: Number, default: 0 },       // ✅ Default value to avoid NaN
  scholarships: [
    {
      name: { type: String },
      amount: { type: Number }
    }
  ],
  paymentHistory: [paymentSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FeeRecord", feeRecordSchema);
