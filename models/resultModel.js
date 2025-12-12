const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  participantName: { type: String, required: true },
  eventName: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Result", resultSchema);
