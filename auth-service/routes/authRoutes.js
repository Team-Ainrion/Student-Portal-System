const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const { register, login,forgotPassword } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password",  forgotPassword);
=======
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
>>>>>>> 0edb1068920e4ef15c215b42cc9fe27d34ba8116

module.exports = router;