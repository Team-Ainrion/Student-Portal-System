const app = require("./app");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Define the port (from .env or fallback)
const PORT = process.env.PORT || 5013;

// Start the server
app.listen(PORT, () => {
  console.log(`💬 Messaging Service is running on port ${PORT}`);
});
