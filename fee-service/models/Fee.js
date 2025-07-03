const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["unpaid", "paid"], default: "unpaid" },
  scholarshipApplied: { type: Boolean, default: false },
  scholarshipAmount: { type: Number, default: 0 },
  paymentDate: { type: Date },
  transactionId: { type: String },
  receiptUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Fee", feeSchema);
