const Grade = require("../models/Grade");
const  calculateFinalGrade  = require("../utils/gradeCalculator");

exports.addGrade = async (req, res) => {
  try {
    const { studentId, courseId, assignmentScores, examScores } = req.body;

    // Validate input
    if (!Array.isArray(assignmentScores) || !Array.isArray(examScores)) {
      return res.status(400).json({ error: "assignmentScores and examScores must be arrays" });
    }
    const finalGrade = calculateFinalGrade(assignmentScores, examScores);
    const grade = new Grade({
      studentId,
      courseId,
      assignmentScores,
      examScores,
      finalGrade,
    });

    await grade.save();
    res.status(201).json({ message: "Grade added", grade });
  } catch (err) {
    res.status(500).json({ error: err.message});
}
};
exports.getGradesByStudent = async (req, res) => {
  try {
    const grades = await Grade.find({ studentId: req.params.studentId });
    res.json(grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.submitGrades = async (req, res) => {
  try {
    const updated = await Grade.findByIdAndUpdate(req.params.id, { submitted: true }, { new: true });
    res.json({ message: "Grades submitted", updated });
  } catch (err) {
    res.status(500).json({ error: err.message});
}
};