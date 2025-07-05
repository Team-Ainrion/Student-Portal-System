
const User = require("../models/User");
const { logEvent } = require("../utils/logger");


exports.exportData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    logEvent("export-data", user._id);
    res.json({ user });
  } catch (err) {
    console.error("Export error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.deleteAccount = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.id);
    if (!deletedUser) return res.status(404).json({ msg: "User not found" });

    logEvent("account-deleted", deletedUser._id);
    res.json({ msg: "Your account has been permanently deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};




