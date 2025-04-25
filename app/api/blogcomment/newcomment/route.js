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

    if (response.status !== 200) {
      return NextResponse.json(
        { message: "Authentication failed. Please log in again." },
        { status: 401 }
      );
    }

    const user = await User.findById(response.id);
    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    const commentCreated = await blogComment.create({
      blogPermalink: permalink,
      userId: new mongoose.Types.ObjectId(response.id),
      comment,
      createdAt: new Date(),
    });

    const blog = await BlogPost.findOne({ permalink });
    if (!blog) {
      return NextResponse.json(
        { message: "Blog post not found." },
        { status: 404 }
      );
    }

    blog.comments += 1;
    await blog.save();

    const notification = {
      type: "commentAdded",
      relatedBlogPermalink: blog.permalink,
      createdAt: new Date(),
    };

    user.notifications.push(notification);
    user.commentCount += 1;
    await user.save();

    return NextResponse.json(
      { message: "Comment added successfully.", comment: commentCreated },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
