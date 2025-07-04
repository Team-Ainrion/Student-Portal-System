module.exports = function generateReceipt(studentId, amount, method, transactionId) {
  return {
    studentId,
    amount,
    method,
    transactionId,
    date: new Date().toISOString(),
    status: "PAID",
    message: "This is a simulated receipt for your payment."
  };
};
