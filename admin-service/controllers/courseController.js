const Course = require("../models/Course");
const Faculty = require("../models/Faculty");

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({ msg: "Course created", course });
  } catch (err) {
    console.error("Create Course Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// View all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Assign faculty to a course
exports.assignFaculty = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { facultyId } = req.body;

    const course = await Course.findById(courseId);
    const faculty = await Faculty.findById(facultyId);

    if (!course || !faculty) return res.status(404).json({ msg: "Course or faculty not found" });

    course.assignedFaculty = facultyId;
    await course.save();

    res.json({ msg: "Faculty assigned to course", course });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
