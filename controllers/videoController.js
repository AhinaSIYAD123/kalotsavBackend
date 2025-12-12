const Video = require("../models/video");
const fs = require("fs");
const path = require("path");


exports.uploadVideo = async (req, res) => {
  try {
    const { category } = req.body;
    const newVideo = new Video({
      name: req.file.originalname,
      category: category || "N/A",
      videoUrl: `/uploads/${req.file.filename}`,
    });
    await newVideo.save();
    res.json({ success: true, message: "Video uploaded successfully", video: newVideo });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ uploadedAt: -1 });
    res.json({ success: true, data: videos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ success: false, message: "Video not found" });

    
    const filePath = path.join(__dirname, "..", video.videoUrl);
    fs.unlink(filePath, (err) => {
      if (err) console.error("File deletion error:", err);
    });

    await Video.findByIdAndDelete(id);

    res.json({ success: true, message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
