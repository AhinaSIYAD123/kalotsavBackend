const Registration = require("../models/registrationModel");

exports.registerParticipant = async (req, res) => {
  try {
    const { eventName, phone, place, college, name } = req.body;


    const email = req.userMail;

    if (!eventName || !name || !phone || !place || !college) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

   
    const exists = await Registration.findOne({ email, eventName });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Already registered for this event"
      });
    }

    
    const newRegistration = new Registration({
      eventName,
      name,
      email,
      phone,
      place,
      college,
    });

    await newRegistration.save();

    res.status(201).json({ success: true, message: "Registration successful" });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllParticipants = async (req, res) => {
  try {
    const participants = await Registration.find(); 
    res.status(200).json({ success: true, data: participants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
