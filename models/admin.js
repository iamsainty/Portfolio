import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;
