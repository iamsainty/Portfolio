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
});

const Recipient =
  mongoose.models.Recipient || mongoose.model("Recipient", recipientSchema);

export default Recipient;
