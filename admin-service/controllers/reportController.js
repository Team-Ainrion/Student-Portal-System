const {
  generateDepartmentReport,
  generateEnrollmentReport,
  exportStudentData
} = require("../services/reportService");

const {
  getOverallStats
} = require("../services/analyticService");

// ✅ Standard report: student count per department
exports.generateStandardReport = async (req, res) => {
  try {
    const departmentReport = await generateDepartmentReport();
    const enrollmentReport = await generateEnrollmentReport();

    res.status(200).json({
      departmentReport,
      enrollmentReport
    });
  } catch (err) {
    console.error("Standard Report Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Export student data (currently supports only JSON)
exports.exportData = async (req, res) => {
  try {
    const { type } = req.query;

    const data = await exportStudentData();

    if (type === "json" || !type) {
      return res.status(200).json({ export: data });
    }

    // Placeholder for future formats (CSV, PDF)
    res.status(501).json({ msg: "Only JSON export supported at the moment" });
  } catch (err) {
    console.error("Export Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Dashboard analytics (optional dashboard stats)
exports.analyticsDashboard = async (req, res) => {
  try {
    const stats = await getOverallStats();
    res.status(200).json({ dashboard: stats });
  } catch (err) {
    console.error("Analytics Dashboard Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
