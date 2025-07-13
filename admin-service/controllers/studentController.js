const Student = require("../models/Student");
const Enrollment = require("../models/Enrollment");

// ✅ 1. Create student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ msg: "Student created successfully", student });
  } catch (err) {
    console.error("Create Student Error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// ✅ 2. Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    console.error("Get Students Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ 3. Update student status (active/inactive)
exports.updateStudentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Student.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Student not found" });
    }

    res.json({ msg: "Student status updated", student: updated });
  } catch (err) {
    console.error("Update Student Status Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ 4. Enroll student in a course
exports.enrollStudent = async (req, res) => {
  try {
    const enrollment = new Enrollment(req.body);
    await enrollment.save();
    res.status(201).json({ msg: "Student enrolled successfully", enrollment });
  } catch (err) {
    console.error("Enroll Student Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ 5. Generate student report (basic info + enrolled courses)
exports.generateReport = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    const courses = await Enrollment.find({ studentId: id });

    res.json({
      student,
      enrolledCourses: courses
    });
  } catch (err) {
    console.error("Generate Report Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
