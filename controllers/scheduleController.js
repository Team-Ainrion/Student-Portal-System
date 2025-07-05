

const Schedule = require("../models/Schedule");
const User = require("../models/User");
const { sendScheduleChangeEmail } = require("../services/emailServices");
const mongoose = require("mongoose");


exports.createSchedule = async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json({ msg: "Schedule created successfully", schedule });
  } catch (err) {
    console.error("Create Schedule Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.getStudentSchedule = async (req, res) => {
  try {
    const { studentId } = req.params;
    const schedule = await Schedule.find({ studentId }).lean();
    res.json(schedule);
  } catch (err) {
    console.error("Get Student Schedule Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.getFacultySchedule = async (req, res) => {
  try {
    const { faculty } = req.params;
    const schedule = await Schedule.find({ faculty }).lean();
    res.json(schedule);
  } catch (err) {
    console.error("Get Faculty Schedule Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Schedule.findByIdAndUpdate(id, req.body, { new: true });
   // Notify student
const student = await User.findById(updated.studentId);
if (student) {
  await sendScheduleChangeEmail(
    student.email,
    "Schedule Updated",
    `Hi ${student.name}, your class schedule has been updated:\n\n${JSON.stringify(req.body, null, 2)}`
  );
}

res.json({ msg: "Schedule updated and student notified", updated });

  } catch (err) {
    console.error("Update Schedule Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);

    if (!schedule) {
      return res.status(404).json({ msg: "Schedule not found" });
    }

    const student = await User.findById(schedule.studentId);

    if (student) {
      await sendScheduleChangeEmail(
        student.email,
        "Schedule Deleted",
        `Hi ${student.name}, your class for "${schedule.subject}" has been removed from your schedule.`
      );
    }

    res.json({ msg: "Schedule deleted and student notified" });
  } catch (err) {
    console.error("Delete schedule error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.calendarView = async (req, res) => {
  try {
    const { studentId, view, date } = req.query;

    if (!studentId || !view) {
      return res.status(400).json({ msg: "studentId and view are required" });
    }

    let query = { studentId };
    const today = date ? new Date(date) : new Date();

    if (view === "daily") {
      const dayOfWeek = today.toLocaleString("en-US", { weekday: "long" }); // e.g., "Monday"
      query.day = dayOfWeek;

    } else if (view === "weekly") {
      const start = new Date(today);
      const end = new Date(today);
      start.setDate(start.getDate() - start.getDay()); // start of week (Sunday)
      end.setDate(start.getDate() + 6); // end of week (Saturday)

      query.createdAt = { $gte: start, $lte: end };

    } else if (view === "monthly") {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      query.createdAt = { $gte: start, $lte: end };

    } else {
      return res.status(400).json({ msg: "Invalid view type" });
    }

    const schedules = await Schedule.find(query);
    res.json(schedules);

  } catch (err) {
    console.error("Calendar view error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};