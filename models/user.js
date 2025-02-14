import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    default: null,
  },
  profilePicture: {
    type: String,
    default:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/profile-pictures/default-profile-picture-hey-sainty.png",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
