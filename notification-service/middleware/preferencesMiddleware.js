const UserPreference = require("../models/userPreference");

async function applyUserPreferences(req, res, next) {
  const userId = req.body.userId;
  const preference = await UserPreference.findOne({ userId });

  if (preference) {
    req.body.channels = preference.preferredChannels;
  }
  next();
}

module.exports = applyUserPreferences;
