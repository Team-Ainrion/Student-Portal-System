const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyOtp,
  forgotPassword
} = require("../controllers/authController");


router.get("/admin-area", auth, role("admin"), (req, res) => {
  res.json({ msg: "Welcome Admin!" });
});

router.get("/faculty-area", auth, role("faculty"), (req, res) => {
  res.json({ msg: "Welcome Faculty!" });
});

router.get("/student-area", auth, role("student"), (req, res) => {
  res.json({ msg: "Welcome Student!" });
});


router.post("/register", register);         
router.post("/login", login);               
router.post("/verify-otp", verifyOtp);      
router.post("/forgot-password", forgotPassword); 

module.exports = router;
