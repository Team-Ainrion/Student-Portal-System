const Announcement = require("../models/Announcement");

/**
 * Create a new announcement
 * @param {Object} data - { title, content, targetGroup }
 */
const createAnnouncement = async (data) => {
  const { title, content, targetGroup } = data;

  if (!title || !content || !targetGroup) {
    throw new Error("All fields (title, content, targetGroup) are required.");
  }

  const newAnnouncement = new Announcement({
    title,
    content,
    targetGroup
  });

  return await newAnnouncement.save();
};

/**
 * Get all announcements
 * @returns {Array} - List of all announcements
 */
const getAllAnnouncements = async () => {
  return await Announcement.find().sort({ createdAt: -1 });
};

/**
 * Get announcements by target group
 * @param {String} group - e.g., 'students', 'faculty'
 * @returns {Array}
 */
const getAnnouncementsByGroup = async (group) => {
  return await Announcement.find({ targetGroup: group.toLowerCase() }).sort({ createdAt: -1 });
};

module.exports = {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementsByGroup
};
