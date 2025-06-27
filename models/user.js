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
          enum: [
            "welcomeMessage",
            "passwordChange",
            "passwordAdded",
            "googleLinked",
            "commentAdded",
            "commentReplied",
            "blogLiked",
            "blogBookmarked",
            "nameUpdated",
            "profilePicUpdated",
            "emailNotifUpdated",
          ],
          required: true,
        },
        relatedBlogPermalink: {
          type: String,
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
      accountSecurityEmail: {
        subscribed: { type: Boolean, default: true },
        reason: { type: String, default: "" },
        unsubscribedAt: { type: Date, default: null },
      },
      newBlogsEmail: {
        subscribed: { type: Boolean, default: true },
        reason: { type: String, default: "" },
        unsubscribedAt: { type: Date, default: null },
      },
      newFeaturesEmail: {
        subscribed: { type: Boolean, default: true },
        reason: { type: String, default: "" },
        unsubscribedAt: { type: Date, default: null },
      },
    },
    notificationPreferences: {
      accountUpdateEmail: {
        type: Boolean,
        default: true,
      },
      newBlogsEmail: {
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
