import AdminCommentReplyEmail from "@/emailTemplate/commentAdminReply";
import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import Admin from "@/models/admin";
import blogComment from "@/models/blogComment";
import BlogPost from "@/models/blogposts";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const { commentId, reply } = await req.json();

    const response = await validateAdmin(req);

    if (response.status !== 200) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please login again." },
        { status: 401 }
      );
    }

    const admin = await Admin.findById(response.id);

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found." },
        { status: 404 }
      );
    }

    const comment = await blogComment.findById(commentId);

    if (!comment) {
      return NextResponse.json(
        { success: false, message: "Comment not found." },
        { status: 404 }
      );
    }

    const newReply = {
      actionBy: "admin",
      comment: reply,
      createdAt: new Date(),
    };

    comment.replies.push(newReply);

    await comment.save();

    const blog = await BlogPost.findOne({ permalink: comment.blogPermalink });
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found." },
        { status: 404 }
      );
    }
    const user = await User.findById(comment.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    await AdminCommentReplyEmail(
      user.name,
      user.email,
      blog.title,
      blog.permalink
    );

    return NextResponse.json(
      {
        success: true,
        reply: newReply,
        message: "Comment replied successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
