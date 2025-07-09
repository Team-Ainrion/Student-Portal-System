exports.generateReport = (records) => {
  let summary = {
    total: records.length,
    present: records.filter(r => r.status === "Present").length,
    absent: records.filter(r => r.status === "Absent").length,
    late: records.filter(r => r.status === "Late").length
  };
  return summary;
};