const Faculty = require("../models/Faculty");
const Course = require("../models/Course");

// Create faculty profile
exports.createFaculty = async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.status(201).json({ msg: "Faculty created", faculty });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all faculty
exports.getAllFaculty = async (req, res) => {
  try {
    const facultyList = await Faculty.find();
    res.json(facultyList);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// View assigned courses (basic workload tracking)
exports.getFacultyWorkload = async (req, res) => {
  try {
    const { id } = req.params;
    const courses = await Course.find({ assignedFaculty: id });
    res.json({ facultyId: id, assignedCourses: courses });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
