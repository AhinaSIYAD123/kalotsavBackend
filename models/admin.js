const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profile: { type: String }, // store image path or URL
});

module.exports = mongoose.model("Admin", adminSchema);
