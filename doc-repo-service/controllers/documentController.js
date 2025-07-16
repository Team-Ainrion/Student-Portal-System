const Document = require("../models/Document");
const path = require("path");

exports.uploadDocument = async (req, res) => {
  try {
    const { title, uploadedBy, role } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const doc = new Document({
      title,
      uploadedBy,
      role,
      filePath: file.path,
      fileName: file.originalname
    });

    await doc.save();
    res.status(201).json({ msg: "Document uploaded", document: doc });
  } catch (err) {
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
};

exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch documents" });
  }
};

exports.downloadDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Document not found" });
    res.download(path.resolve(doc.filePath), doc.fileName);
  } catch (err) {
    res.status(500).json({ error: "Download failed" });
  }
};

// ▸ Update ---------------------------------------------------------------
exports.updateDocument = async (req, res) => {
  try {
    const updated = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Document not found" });
    res.json({ msg: "Document updated", document: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update document", details: err.message });
  }
};

// ▸ Delete ---------------------------------------------------------------
exports.deleteDocument = async (req, res) => {
  try {
    const deleted = await Document.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Document not found" });
    res.json({ msg: "Document deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete document" });
  }
};