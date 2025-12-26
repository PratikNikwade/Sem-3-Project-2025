const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Save bookmark
router.post("/save", async (req, res) => {
  try {
    const { email, course } = req.body;

    if (!email || !course) {
      return res.status(400).json({ message: "Email and course required" });
    }

    const result = await User.updateOne(
      { email },
      { $push: { bookmarks: course } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Bookmark saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
