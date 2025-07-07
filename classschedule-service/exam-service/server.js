const app = require("./app");

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Exam Service running on port ${PORT}`);
});