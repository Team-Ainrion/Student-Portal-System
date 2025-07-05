const Exam = require("../models/Exam");

exports.createExam = async (req, res) => {
  try {
    const exam = new Exam(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.registerStudent = async (req, res) => {
  try {
    const { examId, studentId } = req.body;
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ error: "Exam not found" });

    if (!exam.participants.includes(studentId)) {
      exam.participants.push(studentId);
      await exam.save();
    }

    res.json({ message: "Student registered", exam });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};