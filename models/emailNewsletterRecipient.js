import mongoose from "mongoose";

const recipientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  isSubscribed: {
    type: Boolean,
    default: true,
  },
  unsubscribeReason: {
    type: String,
    default: null,
  },
  unsubscribedAt: {
    type: Date,
    default: null,
  }
});

const Recipient =
  mongoose.models.Recipient || mongoose.model("Recipient", recipientSchema);

export default Recipient;
