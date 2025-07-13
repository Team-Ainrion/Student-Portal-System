const Student = require("../models/Student");
const Enrollment = require("../models/Enrollment");

// Generate standard student count per department
exports.generateDepartmentReport = async () => {
  return await Student.aggregate([
    { $group: { _id: "$department", count: { $sum: 1 } } }
  ]);
};

// Generate enrollment report
exports.generateEnrollmentReport = async () => {
  return await Enrollment.aggregate([
    { $group: { _id: "$semester", totalEnrollments: { $sum: 1 } } }
  ]);
};

// Export student data (used by exportData controller)
exports.exportStudentData = async () => {
  return await Student.find().lean();
};
