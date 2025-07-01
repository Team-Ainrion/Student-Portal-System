

exports.logEvent = (eventType, userId, details = {}) => {
  const log = {
    timestamp: new Date().toISOString(),
    eventType,
    userId,
    details
  };

  console.log(JSON.stringify(log));   
};