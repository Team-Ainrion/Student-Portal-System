
const express = require("express");
const router = express.Router();
const verify = require("../middleware/auth");

// ✅ protect everything in this router
router.use(verify);

const {
  getAllResources,
  getResourceById,
  trackUsage,
  addResource,
} = require("../controllers/resourceController");

- router.get("/", getAllResources);
+ router.get("/", verify, getAllResources);

- router.get("/:id", getResourceById);
+ router.get("/:id", verify, getResourceById);

- router.post("/", addResource);
+ router.post("/", verify, addResource);

- router.post("/track", trackUsage);
+ router.post("/track", verify, trackUsage);

module.exports = router;  

