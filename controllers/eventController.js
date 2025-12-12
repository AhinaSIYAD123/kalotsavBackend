const Event = require("../models/Event");


exports.addEvent = async (req, res) => {
  try {
    const { name, category, img } = req.body;
    if (!name || !category) {
      return res.status(400).json({ success: false, message: "Name and category are required" });
    }

    const newEvent = new Event({ name, category, img });
    await newEvent.save();

    res.status(201).json({ success: true, message: "Event added successfully", event: newEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
