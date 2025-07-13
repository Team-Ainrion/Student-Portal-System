const { sendEmail } = require("../services/emailService");
const { sendSMS } = require("../services/smsService");
const { sendInApp } = require("../services/inAppService");

async function sendNotification(userId, title, message, channels) {
  if (channels.includes("email")) {
    await sendEmail(userId, title, message);
  }
  if (channels.includes("sms")) {
    await sendSMS(userId, message);
  }
  if (channels.includes("in-app")) {
    await sendInApp(userId, message);
  }
}

module.exports = sendNotification;
