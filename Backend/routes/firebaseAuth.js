const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");

const userData = require("./../models/UserData");

const JWT_SECRET = process.env.JWT_SECRET;

const validateUserToken = require("../middleware/validateUserToken");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, emailVerified, uid, profilePictureUrl } = req.body;

    const user = await userData.create({
      name: name,
      email: email,
      emailVerified: emailVerified,
      uid: uid,
      profilePictureUrl: profilePictureUrl,
    });

    const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET);

    res.status(201).json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating user" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, emailVerified } = req.body;
    const user = await userData.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ success: false });
    }
    user.emailVerified = emailVerified;
    await user.save();
    const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET);
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error signing in user" });
  }
});

// user data based on the token recieved
router.get("/userdata", validateUserToken, async (req, res) => {
  try {
    const user = await userData.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ tokenValid: false, message: "User not found" });
    }
    res.status(200).json({ tokenValid: true, user });
  } catch (error) {
    res.status(500).json({ tokenValid: false });
  }
});

module.exports = router;
