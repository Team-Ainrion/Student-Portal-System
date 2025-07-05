// server.js
const app = require('./app'); // Import the Express app
const connectDB = require('./config/db'); // MongoDB connection
const dotenv = require('dotenv');

dotenv.config(); // Load env variables

const PORT = process.env.PORT || 5007;

// Connect to MongoDB first, then start server
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
