const { sendInAppNotification } = require("../sockets/notificationSocket");

async function sendInApp(userId, message) {
  sendInAppNotification(userId, message);
}

module.exports = { sendInApp };
