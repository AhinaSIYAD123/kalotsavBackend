const Result = require("../models/resultModel");


exports.createResult = async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getResults = async (req, res) => {
  try {
    const results = await Result.find();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
