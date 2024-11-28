const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userData = require("../models/UserData");
const JWT_SECRET = process.env.JWT_SECRET;

const validateUserToken = require("../middleware/validateUserToken");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await userData.findOne({ email });
    if (userExist) {
      return res.status(400).json({success : false, message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userData.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: "user",
    });

    const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET);

    res.status(201).json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating user" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userData.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: "Email doesn't exist" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if( !isValidPassword ) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET);

    res.status(200).json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error signing in user" });
  }
});

// user data based on the token recieved
router.get("/userdata", validateUserToken, async (req, res) => {
  try {
    const user = await userData.findById(req.user.id).select("-password");
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

router.get("/userdatabyid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userData.findById(id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching user data" });
  }
});

module.exports = router;
