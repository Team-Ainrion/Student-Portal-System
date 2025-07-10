const Announcement = require("../models/announcement");

// POST: Create a new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ error: "Failed to create announcement" });
  }
};

// GET: Get all announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
};

// GET: Get announcements by target group
exports.getAnnouncementsByGroup = async (req, res) => {
  try {
    const group = req.params.group;
    const announcements = await Announcement.find({ targetGroup: group });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch group announcements" });
  }
};

// PUT: Update announcement by ID
exports.updateAnnouncement = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Announcement.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Announcement not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update announcement" });
  }
};

// ✅ NEW: GET announcement by ID
exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ error: "Announcement not found" });
    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ NEW: DELETE announcement by ID
exports.deleteAnnouncement = async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Announcement not found" });
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};


