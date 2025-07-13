module.exports = function calculateFinalGrade(assignments = [], exams = []) {
  let totalAssignment = assignments.reduce((sum, score) => sum + score, 0);
  let totalExam = exams.reduce((sum, score) => sum + score, 0);

  const avgAssignment = assignments.length ? totalAssignment / assignments.length : 0;
  const avgExam = exams.length ? totalExam / exams.length : 0;

  return (avgAssignment * 0.4 + avgExam * 0.6).toFixed(2);
};