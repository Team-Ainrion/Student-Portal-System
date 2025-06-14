const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios"); // ✅ Make sure axios is installed

// Forgot Password (simulated)
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    return res.json({ msg: "Password reset link sent to your email (simulated)" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Register
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  console.log("Frontend Register Request Body:", req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
    });

    await user.save();

    // ✅ Create profile in profile-service
    try {
      await axios.post("http://localhost:5001/api/profiles", {
        _id:user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        RegisterNumber: "",
        contact: "",
        address: "",
        department: "",
        

      });
      console.log("✅ Profile created successfully in profile-service");
    } catch (profileErr) {
      console.error(" Failed to create profile:", profileErr.message);
    }

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
};