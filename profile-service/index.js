const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" Profile DB connected"))
  .catch(err => console.log(" DB Error:", err));

app.use("/api/profiles", require("./routes/profileRoutes"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Profile service running on port ${PORT}`));