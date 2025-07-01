// 📂 utils/logger.js
// ✅ Simple logging utility for GDPR traceability and debugging

exports.logEvent = (eventType, userId, details = {}) => {
  const log = {
    timestamp: new Date().toISOString(),
    eventType,
    userId,
    details
  };

  console.log(JSON.stringify(log)); // Log to console; extend to file/db if needed
};
