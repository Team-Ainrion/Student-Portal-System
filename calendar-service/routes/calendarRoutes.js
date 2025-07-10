const express = require("express");
const router = express.Router();
const calendarController = require("../controllers/calendarController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, calendarController.createEvent);
router.get("/", auth, calendarController.getAllEvents);
router.get("/course/:courseId", auth, calendarController.getEventsByCourse);
router.delete("/:id", auth, calendarController.deleteEvent);

module.exports=router;