const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  profilePictureUrl: {
    type: String,
  }
});

const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;
