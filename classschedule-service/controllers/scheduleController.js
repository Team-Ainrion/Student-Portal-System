

const Schedule = require("../models/Schedule");


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
    res.json({ msg: "Schedule updated", updated });
  } catch (err) {
    console.error("Update Schedule Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    await Schedule.findByIdAndDelete(id);
    res.json({ msg: "Schedule deleted" });
  } catch (err) {
    console.error("Delete Schedule Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
