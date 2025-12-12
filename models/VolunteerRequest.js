const mongoose = require("mongoose");

const volunteerRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  stage: { type: String },
  description: { type: String, required: true },
  status: { type: String, default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("VolunteerRequest", volunteerRequestSchema);
