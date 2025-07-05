const app = require("./app");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5005;

connectDB();

app.listen(PORT, () => {
  console.log(`Academic Service running on port ${PORT}`);
});
