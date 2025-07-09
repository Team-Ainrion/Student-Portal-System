const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5007;

app.listen(PORT, () => {
  console.log(`Attendance Service running on port ${PORT}`);
});