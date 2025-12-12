const Notification = require("../models/Notifications");


const createNotification = async (req, res) => {
  try {
    const { title, message } = req.body;
    const newNotification = new Notification({ title, message });
    await newNotification.save();

    res.status(201).json({
      success: true,
      notification: newNotification,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications }); 
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  createNotification,
  getNotifications,
};
