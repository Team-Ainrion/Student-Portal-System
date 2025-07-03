const gradePoints = {
  "A+": 10, "A": 9, "B+": 8, "B": 7,
  "C+": 6, "C": 5, "D": 4, "F": 0
};

exports.calculateGPA = (courses) => {
  let totalPoints = 0, totalCredits = 0;

  courses.forEach(course => {
    const gp = gradePoints[course.grade] || 0;
    totalPoints += gp * course.creditHours;
    totalCredits += course.creditHours;
  });

  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
};
