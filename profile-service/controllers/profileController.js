const UserProfile = require("../models/UserProfile");

// GET all profiles
exports.getAllProfiles = async (req, res) => {
  const users = await UserProfile.find();
  res.json(users);
};

// GET by ID
exports.getProfileById = async (req, res) => {
  try {
    console.log(" ID requested:", req.params.id);

    const user = await UserProfile.findById(req.params.id);

    if (!user) {
      console.log(" Not found in DB");
      return res.status(404).json({ msg: "Profile not found" });
    }

    console.log("✅ Profile found:", user);
    res.json(user);
  } catch (err) {
    console.error(" Server error:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// POST create
exports.createProfile = async (req, res) => {
  const newUser = new UserProfile(req.body);
  await newUser.save();
  res.status(201).json(newUser);
};

// PUT update
exports.updateProfile = async (req, res) => {
  const updated = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE
exports.deleteProfile = async (req, res) => {
  await UserProfile.findByIdAndDelete(req.params.id);
  res.json({ msg: "Profile deleted" });
};