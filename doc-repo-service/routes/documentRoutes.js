
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const verify = require("../middleware/auth");
router.use(verify); 
const {
  uploadDocument,
  getAllDocuments,
  downloadDocument,
  updateDocument,
  deleteDocument
} = require("../controllers/documentController");

// Multer config
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads/"),
  filename: (_req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("file"), uploadDocument);
router.get("/", getAllDocuments);
router.get("/download/:id", downloadDocument);
router.put("/:id", updateDocument);
router.delete("/:id", deleteDocument);

module.exports = router;
