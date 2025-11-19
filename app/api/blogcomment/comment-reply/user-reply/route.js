import { connectToMongo } from "@/lib/mongodb";
import { validateUsertoken } from "@/middleware/validateUsertoken";
import blogComment from "@/models/blogComment";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const { commentId, commentReply } = await req.json();

    console.log(commentId, commentReply);

    const response = await validateUsertoken(req);

    if (response.status !== 200) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please login again." },
        { status: 401 }
      );
    }

    const user = await User.findById(response.id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
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
      actionBy: "user",
      comment: commentReply,
      createdAt: new Date(),
    };

    comment.replies.push(newReply);

    await comment.save();

    return NextResponse.json(
      {
        success: true,
        message: "Comment replied successfully.",
        reply: newReply,
      },
      { status: 201 }
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
