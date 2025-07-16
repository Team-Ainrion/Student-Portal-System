async function sendSMS(userId, message) {
  console.log(`📱 SMS to ${userId}: ${message}`);
}

module.exports = { sendSMS };
