const express = require("express");

const router = express.Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const userData = require("./../models/UserData");

const JWT_SECRET = process.env.JWT_SECRET;

const validateUserToken = require("../middleware/validateUserToken");

router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      emailVerified,
      uid,
      role,
      profilePictureUrl,
      authType,
    } = req.body;

    const salt = await bcrypt.genSalt(10);

    const hashedPass =
      authType === "emailPass" ? await bcrypt.hash(password, salt) : password;

    const user = await userData.create({
      name: name,
      email: email,
      emailVerified: emailVerified,
      password: hashedPass,
      role: role,
      uid: uid,
      profilePictureUrl: profilePictureUrl,
    });

    const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET);

    res.status(201).json({ userCreated: true, token, data: user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

router.post("signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userData.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .json({ userFound: false, message: "Invalid email" });
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        userFound: true,
        loginSuccess: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
    res.status(200).json({ userFound: true, loginSuccess: true, token });
  } catch (error) {
    res.status(500).json({ message: "Error signing in user" });
  }
});

// user data based on the token recieved
router.get("/userdata", validateUserToken, async (req, res) => {
  try {
    const user = await userData.findById(req.user.id);
    if(!user) {
        return res.status(404).json({ tokenValid: false, message: "User not found" });
    }
    res.status(200).json({ tokenValid: true, user });
  } catch (error) {
    res.status(500).json({ tokenValid: false });
  }
});

module.exports = router;
