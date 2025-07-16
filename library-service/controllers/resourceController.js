const Resource = require("../models/Resource");
const UsageLog = require("../models/UsageLog");

exports.getAllResources = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search
      ? { title: { $regex: search, $options: "i" } }
      : {};
    const resources = await Resource.find(filter);
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch resources" });
  }
};

exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ msg: "Resource not found" });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: "Error fetching resource" });
  }
};

exports.trackUsage = async (req, res) => {
  try {
    const { userId, resourceId } = req.body;
    const log = new UsageLog({ userId, resourceId });
    await log.save();
    res.status(201).json({ msg: "Usage logged" });
  } catch (err) {
    res.status(500).json({ error: "Error tracking usage" });
  }
};

exports.addResource = async (req, res) => {
  try {
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json({ msg: "Resource added", resource });
  } catch (err) {
    res.status(400).json({ error: "Failed to add resource", details: err.message });
  }
};

