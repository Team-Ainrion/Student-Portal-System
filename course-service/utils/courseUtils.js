exports.checkPrerequisites = (required, completed) =>
  required.every(id => completed.includes(id.toString()));

exports.calculateStudentCredits = async (studentId, CourseModel) => {
  const enrolledCourses = await CourseModel.find({ studentsEnrolled: studentId });
  return enrolledCourses.reduce((total, course) => total + course.creditHours, 0);
};
