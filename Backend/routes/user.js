const express = require("express");
const router = express.Router();

const UserData = require("../models/UserData");
const validateUserToken = require("../middleware/validateUserToken");
const upload = require("../middleware/blogcoverupload");
const fs = require("fs");
const {
  profilePictureUploadToAWS,
  profilePictureDeleteFromAWS,
} = require("../service/profileUploadAWS");
const { sendOTPforPasswordRecover } = require("../service/emailWithNodemailer");

router.put(
  "/edit-profile",
  validateUserToken,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const user = await UserData.findById(req.user.id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const file = req.file;
      let profilePictureUrl = user.profilePictureUrl;

      if (file) {
        const uploadResponse = await profilePictureUploadToAWS(file);
        if (uploadResponse) {
          if (user.profilePictureUrl) {
            const previousURL = user.profilePictureUrl
              .split("/")
              .slice(-2)
              .join("/");
            const deleteResponse = await profilePictureDeleteFromAWS(
              previousURL
            );
            if (!deleteResponse) {
              console.log("Error deleting previous profile picture");
            }
          }
          profilePictureUrl = uploadResponse.Location;
          fs.unlinkSync(file.path);
        }
      }

      const updatedUser = await UserData.findByIdAndUpdate(req.user.id, {
        profilePictureUrl,
        name: req.body.name,
      });

      res.json({
        success: true,
        message: "Changes saved successfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Failed to save changes, please try again" });
    }
  }
);

router.put('/change-password', validateUserToken, async (req, res) => {
    try {
        const user = await UserData.findById(req.user.id);
        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.currentPassword, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({success: false, message: "Current password is incorrect"});
        }

        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({success: true, message: "Password changed successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Failed to change password, please try again"});
    }
})

router.post('/send-otp-for-password-recover', validateUserToken, async (req, res) => {
  try {
    const user = await UserData.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    const otpSent = await sendOTPforPasswordRecover(user.name, user.email, otp);

    if(otpSent){
      return res.status(200).json({success: true, otp, message: "OTP sent successfully"});
    }

    res.status(400).json({success: false, message: "Failed to send OTP, please try again"});
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Failed to send OTP, please try again"});
  }
})

router.put('/reset-password', validateUserToken, async (req, res) => {
  try {
    const user = await UserData.findById(req.user.id);

    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    user.save();

    res.status(200).json({success: true, message: "Password reset successfully"});
  } catch (error) {
    res.status(500).json({success: false, message: "Failed to reset password, please try again"});
  }
});

router.put('/update-notification-setting', validateUserToken, async (req, res) => {
  try {
    const user = await UserData.findById(req.user.id);

    const emailNewsletter = req.body.emailNewsletter;
    const emailSecurityAlert = req.body.emailSecurityAlert;

    user.notifications.emailNewsletter = emailNewsletter;
    user.notifications.emailSecurityAlert = emailSecurityAlert;

    await user.save();

    res.status(200).json({success: true, message: "Notification settings updated successfully"});
  } catch (error) {
    res.status(500).json({success: false, message: "Failed to update notification settings, please try again"});
  }
});

module.exports = router;
