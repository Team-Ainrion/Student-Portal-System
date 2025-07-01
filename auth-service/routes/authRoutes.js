// 📂 routes/authRoutes.js
// ✅ Full route definitions for auth-service (2FA + RBAC compatible)

const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyOtp,
  forgotPassword
} = require("../controllers/authController");

// 🔐 Authentication Routes
router.post("/register", register);         // Create new user
router.post("/login", login);               // Step 1: password check + OTP
router.post("/verify-otp", verifyOtp);      // Step 2: OTP validation + JWT
router.post("/forgot-password", forgotPassword); // Simulated password reset

module.exports = router;
