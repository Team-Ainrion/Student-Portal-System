// controllers/materialController.js
const Material = require("../models/Material");
const path = require("path");
const fs = require("fs");

// Upload material
exports.uploadMaterial = async (req, res) => {
  try {
    const { courseId, uploadedBy, title } = req.body;
    const filePath = req.file.path;

    const material = new Material({
      courseId,
      uploadedBy,
      title,
      filePath,
    });

    await material.save();
    res.status(201).json({ message: "Material uploaded", material });
  } catch (err) {
    res.status(500).json({ error: err.message});
}
};

// Get materials by course
exports.getMaterialsByCourse = async (req, res) => {
  try {
    const materials = await Material.find({ courseId: req.params.courseId });
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Download material
exports.downloadMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }

    const filePath = material.filePath || material.path; // Handle both field names

    if (!filePath) {
      return res.status(400).json({ error: "File path not found for this material." });
    }

    res.download(path.resolve(filePath), material.title || material.filename);
  } catch (err) {
    res.status(500).json({ error: err.message});
}
};

// Delete material
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ error: "Material not found" });

    const filePath = material.filePath || material.path; // fallback if path used before
    if (!filePath) {
      return res.status(400).json({ error: "No file path found for this material." });
    }

    // Delete the file from the file system
    fs.unlinkSync(path.resolve(filePath));

    // Delete the DB entry
    await material.deleteOne();

    res.json({ message: "Material deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message});
}
};