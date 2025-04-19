import mongoose from "mongoose";
import User from "../models/user.js";

async function updateUserSchema() {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    await mongoose.connect(MONGO_URI);

    const users = await User.find();    

    for (const user of users) {

      user.createdAt = user.createdAt || new Date();
      user.commentCount = user.commentCount || 0;
      user.blogsLiked = user.blogsLiked || [];
      user.blogsBookmarked = user.blogsBookmarked || [];
      user.recentBlogReads = user.recentBlogReads || [];
      user.notifications = user.notifications || [];
      user.emailPreferences = user.emailPreferences || {
        accountActivity : true,
        newBlog : true,
      } ;

      await user.save();
    }

  } catch (error) {
    console.error("Error updating users:", error);
  }
}

updateUserSchema();
