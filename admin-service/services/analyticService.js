const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

exports.getOverallStats = async () => {
  const totalCourses = await Course.countDocuments();
  const totalEnrollments = await Enrollment.countDocuments();

  const topCourses = await Enrollment.aggregate([
    { $group: { _id: "$courseCode", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);

  return {
    totalCourses,
    totalEnrollments,
    topCourses
  };
};
