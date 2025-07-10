const express = require("express");
const router = express.Router();

const {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementsByGroup,
  updateAnnouncement,
  getAnnouncementById,       
  deleteAnnouncement         
} = require("../controllers/announcementController");

// Routes
router.post("/", createAnnouncement);
router.get("/", getAllAnnouncements);
router.get("/group/:group", getAnnouncementsByGroup);
router.get("/id/:id", getAnnouncementById); // ✅ Avoid route collision with "/:id"
router.put("/:id", updateAnnouncement);
router.delete("/:id", deleteAnnouncement);  // ✅ DELETE route

module.exports = router;
