const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json("Registration successful");
  } 
  catch (err) {
    res.status(500).json(err);
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json("User not found");
    if (user.password !== password) return res.status(400).json("Invalid password");

const token = jwt.sign(
  { userMail: user.email, role: user.role },
  process.env.JWT_KEY,
  { expiresIn: "7d" }
);


    res.status(200).json({
      message: "Login successful",
      token,
      user
    });
  } 
  catch (err) {
    res.status(500).json(err);
  }
};



// ---------------- GOOGLE LOGIN ------------------

exports.googleLogin = async (req, res) => {
  try {
    const { name, email, googleId, picture } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email missing" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user with google id
      user = new User({
        name,
        email,
        password: googleId, // not used, just placeholder
        role: "participant", // default role (change if needed)
        profile: picture
      });

      await user.save();
    }

    // Create JWT
    const token = jwt.sign(
      { userMail: user.email, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Google Login successful",
      token,
      user
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }); 
  

    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.updateAdmin = async (req, res) => {
  try {
    const admin = await User.findOne({ role: "admin" });
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

    if (req.body.username) admin.name = req.body.username;
    if (req.body.password) admin.password = req.body.password;
    if (req.file) admin.profile = req.file.filename;

    await admin.save();

    res.status(200).json({ success: true, adminData: admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAdminData = async (req, res) => {
  try {
    const admin = await User.findOne({ role: "admin" });
    if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

    res.status(200).json({ success: true, adminData: admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




exports.getParticipantData = async (req, res) => {
  try {
    const email = req.userMail;  

    const participant = await User.findOne({ email, role: "participant" });

    if (!participant)
      return res.status(404).json({ success: false, message: "Participant not found" });

    res.status(200).json({ success: true, participantData: participant });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};



exports.updateParticipant = async (req, res) => {
  try {
    const email = req.userMail; 
    const participant = await User.findOne({ email, role: "participant" });

    if (!participant)
      return res.status(404).json({ success: false, message: "Participant not found" });

    const { name, password } = req.body;

    if (name) participant.name = name;
    if (password) participant.password = password;
    if (req.file) participant.profile = req.file.filename;

    await participant.save();

    res.status(200).json({ success: true, data: participant });

  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};






exports.updateOrganizer = async (req, res) => {
  try {
    const email = req.userMail;  // from JWT
    const organizer = await User.findOne({ email, role: "organizer" });

    if (!organizer)
      return res.status(404).json({ success: false, message: "Organizer not found" });

    const { name, password } = req.body;

    if (name) organizer.name = name;
    if (password) organizer.password = password;
    if (req.file) organizer.profile = req.file.filename; // if organizer has profile picture

    await organizer.save();

    res.status(200).json({ success: true, data: organizer });

  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};


exports.getOrganizerData = async (req, res) => {
  try {
    const email = req.userMail; // from JWT

    const organizer = await User.findOne({ email, role: "organizer" });
    if (!organizer)
      return res.status(404).json({ success: false, message: "Organizer not found" });

    res.status(200).json({ success: true, data: organizer });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
