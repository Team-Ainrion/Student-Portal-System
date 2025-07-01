
const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { sendOTP } = require("../services/emailService");
const { generateAndStoreOTP, verifyOTP } = require("../services/otpService");
const { logEvent } = require("../utils/logger");


exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ msg: "All fields are required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

   
    try {
      await axios.post("http://localhost:5001/api/profiles", {
        _id: user._id, name, email, role,
        RegisterNumber: "", contact: "", address: "", department: ""
      });
    } catch (err) {
      console.error("Profile service error:", err.message);
    }

    logEvent("register", user._id);
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ msg: "Email and password are required" });

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      logEvent("failed-login", "unknown", { email });
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const otp = await generateAndStoreOTP(email);
    await sendOTP(email, otp);
    logEvent("otp-sent", user._id);
    res.json({ msg: "OTP sent to your email" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    return res.status(400).json({ msg: "Email and OTP are required" });

  try {
    const valid = await verifyOTP(email, otp);
    if (!valid) return res.status(400).json({ msg: "Invalid or expired OTP" });

    const user = await User.findOne({ email });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    logEvent("login-success", user._id);
    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role }
    });
  } catch (err) {
    console.error("OTP verify error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });
    logEvent("password-reset-request", user._id);
    res.json({ msg: "Password reset link sent to your email (simulated)" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
