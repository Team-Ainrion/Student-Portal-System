const Course = require("../models/Course");

const checkPrerequisites = (requiredCourses, completedCourses) => {
  return requiredCourses.every(courseId => completedCourses.includes(courseId.toString()));
};

exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAvailableCourses = async (req, res) => {
  try {
    const today = new Date();
    const courses = await Course.find({
      registrationStart: { $lte: today },
      registrationEnd: { $gte: today }
    });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.registerForCourse = async (req, res) => {
  const { courseId, studentId, completedCourses = [], currentCredits = 0 } = req.body;
  try {
    const course = await Course.findById(courseId);
    const now = new Date();

    if (!course) return res.status(404).json({ error: "Course not found" });
    if (now < course.registrationStart || now > course.registrationEnd)
      return res.status(400).json({ error: "Not within registration period" });

    const hasPrereqs = checkPrerequisites(course.prerequisites, completedCourses);
    if (!hasPrereqs) return res.status(400).json({ error: "Missing prerequisites" });

    if (currentCredits + course.creditHours > 24)
      return res.status(400).json({ error: "Credit hour limit exceeded" });

    if (course.studentsEnrolled.includes(studentId))
      return res.status(400).json({ error: "Already enrolled" });

    if (course.studentsEnrolled.length < course.capacity) {
      course.studentsEnrolled.push(studentId);
    } else {
      if (!course.waitlist.includes(studentId)) {
        course.waitlist.push(studentId);
        await course.save();
        return res.status(200).json({ message: "Added to waitlist", course });
      } else {
        return res.status(400).json({ error: "Already in waitlist" });
      }
    }

    await course.save();
    res.status(200).json({ message: "Student enrolled", course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.dropCourse = async (req, res) => {
  const { courseId, studentId } = req.body;
  try {
    const course = await Course.findById(courseId);
    const now = new Date();

    if (!course) return res.status(404).json({ error: "Course not found" });
    if (now > course.dropDeadline)
      return res.status(400).json({ error: "Drop period is over" });

    course.studentsEnrolled = course.studentsEnrolled.filter(id => id.toString() !== studentId);

    if (course.waitlist.length > 0 && course.studentsEnrolled.length < course.capacity) {
      const nextStudent = course.waitlist.shift();
      course.studentsEnrolled.push(nextStudent);
    }

    await course.save();
    res.status(200).json({ message: "Course dropped", course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
