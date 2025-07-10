const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`Material service running on port ${PORT}`));