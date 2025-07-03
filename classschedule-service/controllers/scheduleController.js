const Schedule = require("../models/Schedule");

// GET schedule by studentId
exports.getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.find({ studentId: req.params.studentId });
    res.json(schedule);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// POST to create new schedule
exports.createSchedule = async (req, res) => {
  try {
    const newSchedule = new Schedule(req.body);
    const saved = await newSchedule.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).send("Error creating schedule");
  }
};
