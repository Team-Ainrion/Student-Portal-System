async function sendEmail(userId, title, message) {
  console.log(`📧 Email to ${userId}: ${title} - ${message}`);
}

module.exports = { sendEmail };
