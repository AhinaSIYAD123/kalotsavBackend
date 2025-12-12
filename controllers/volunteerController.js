const VolunteerRequest = require("../models/VolunteerRequest");

exports.createRequest = async (req, res) => {
  try {
    const { type, stage, description } = req.body;

   
    const name = req.userMail || "Anonymous";

    const request = await VolunteerRequest.create({ name, type, stage, description });
    res.status(201).json({ success: true, request });
  } catch (error) {
    console.error("Create Request Error:", error);
    res.status(500).json({ error: "Failed to create request" });
  }
};


exports.getAllRequests = async (req, res) => {
  try {
    const requests = await VolunteerRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await VolunteerRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json({ success: true, request: updated });
  } catch (error) {
    console.error("Update Request Status Error:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
};
