import mongoose from "mongoose";

const emailOtpSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  otp: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});

const EmailOtp =
  mongoose.models.EmailOtp || mongoose.model("EmailOtp", emailOtpSchema);

export default EmailOtp;
