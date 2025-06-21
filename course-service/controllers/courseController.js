const Course = require("../models/Course");

exports.addCourse = async (req, res) => {
  const { title, description, faculty } = req.body;
  if (!title || !faculty) {
    return res.status(400).json({ error: "Title and faculty are required." });
  }

  try {
    const course = new Course({ title, description, faculty });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.enrollStudent = async (req, res) => {
  const { courseId, studentId } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    if (!course.studentsEnrolled.includes(studentId)) {
      course.studentsEnrolled.push(studentId);
      await course.save();
    }

    res.status(200).json({
      message: "Student enrolled successfully",
      course
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};