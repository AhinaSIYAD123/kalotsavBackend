const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  name: { type: String, required: true },        // original file name
  category: { type: String, required: true },    // event/category
  videoUrl: { type: String, required: true },    // path to file
  uploadedAt: { type: Date, default: Date.now } // timestamp
});

module.exports = mongoose.model("Video", videoSchema);
