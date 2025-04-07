import mongoose from "mongoose";

const blogCommentSchema = new mongoose.Schema({
  blogPermalink: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  replies: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      reply: { type: String },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const blogComment =
  mongoose.models.blogComment ||
  mongoose.model("blogComment", blogCommentSchema);
export default blogComment;
