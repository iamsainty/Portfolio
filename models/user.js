import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    blogsLiked: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    blogsBookmarked: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    recentBlogReads: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    notifications: [
      {
        type: {
          type: String,
          enum: ["activity", "comment", "like", "bookmark"],
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        blogId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Blog",
        },
        relatedUserId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        read: {
          type: Boolean,
          default: false,
        },
      },
    ],
    emailPreferences: {
      accountActivity: {
        type: Boolean,
        default: true,
      },
      newBlogs: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
