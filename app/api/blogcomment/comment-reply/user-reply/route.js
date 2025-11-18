import { connectToMongo } from "@/lib/mongodb";
import { validateUsertoken } from "@/middleware/validateUsertoken";
import blogComment from "@/models/blogComment";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const { commentId, commentReply } = await req.json();

    const response = await validateUsertoken(req);

    if (response.status !== 200) {
      return NextResponse.json(
        { message: "Unauthorized. Please login again." },
        { status: 401 }
      );
    }

    const user = await User.findById(response.id);

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    const comment = await blogComment.findById(commentId);

    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found." },
        { status: 404 }
      );
    }

    comment.replies.push({
      actionBy: "user",
      comment: commentReply,
      createdAt: new Date(),
    });

    await comment.save();

    return NextResponse.json(
      { message: "Comment replied successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
