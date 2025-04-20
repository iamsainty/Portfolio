import { connectToMongo } from "@/lib/mongodb";
import { validateUsertoken } from "@/middleware/validateUsertoken";
import blogComment from "@/models/blogComment";
import BlogPost from "@/models/blogposts";
import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const { permalink, comment } = await req.json();

    const response = await validateUsertoken(req);

    const user = await User.findById(response.id);

    if (response.status === 200) {
      const commentCreated = await blogComment.create({
        blogPermalink: permalink,
        userId: new mongoose.Types.ObjectId(response.id),
        comment,
        createdAt: new Date(),
      });

      const blog = await BlogPost.findOne({ permalink });

      blog.comments = blog.comments + 1;
      await blog.save();

      const notification = {
        type: "commentAdded",
        relatedBlogPermalink: blog.permalink,
        createdAt: new Date(),
      };

      user.notifications.push(notification);

      user.commentCount += 1;
      await user.save();

      return NextResponse.json({ commentCreated }, { status: 201 });
    }

    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create comment" },
      { status: 500 }
    );
  }
}
