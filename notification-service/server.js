const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5014;

app.listen(PORT, () => {
  console.log(`🔔 Notification Service is running on port ${PORT}`);
});
