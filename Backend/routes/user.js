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
        message: "Profile picture updated successfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
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
        res.status(500).json({success: false, message: "Internal server error"});
    }
})

module.exports = router;
