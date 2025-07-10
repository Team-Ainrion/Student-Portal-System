const express = require("express");
const router = express.Router();
const materialController = require("../controllers/materialController");
const upload = require("../middleware/fileUpload");
const auth = require("../middleware/authMiddleware"); // ✅ Import auth middleware

// Upload a material (protected route)
router.post("/upload", auth, upload.single("file"), materialController.uploadMaterial);

// Get all materials for a course (protected route)
router.get("/course/:courseId", auth, materialController.getMaterialsByCourse);

// Download a material by ID (protected route)
router.get("/download/:id", auth, materialController.downloadMaterial);

// Delete material by ID (only for authorized users like faculty)
router.delete("/:id", auth, materialController.deleteMaterial);

module.exports=router;