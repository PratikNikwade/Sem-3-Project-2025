const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Save quiz answers
router.post("/save", async (req, res) => {
  try {
    const { email, quizAnswers } = req.body;

    // Basic validation
    if (!email || !quizAnswers) {
      return res.status(400).json({ message: "Email and quiz answers required" });
    }

    const result = await User.updateOne(
      { email },
      { $set: { quizAnswers: quizAnswers } }
    );

    // If no user matched
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Quiz answers saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
