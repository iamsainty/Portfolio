const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  uid: {
    type: String,
  },
  profilePictureUrl : {
    type : String
  }
});

const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;
