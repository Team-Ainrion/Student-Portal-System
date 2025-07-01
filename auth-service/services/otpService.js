const OTP = require("../models/OTP");

exports.generateAndStoreOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await OTP.deleteMany({ email }); // Ensure only one active OTP per user
  await OTP.create({ email, otp, expiresAt });

  return otp;
};

exports.verifyOTP = async (email, otp) => {
  const record = await OTP.findOne({ email });
  if (!record || record.otp !== otp || record.expiresAt < new Date()) return false;
  await OTP.deleteMany({ email }); // OTP used or expired
  return true;
};
