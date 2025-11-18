import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import Admin from "@/models/admin";
import blogComment from "@/models/blogComment";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const { commentId, commentReply } = await req.json();

    const response = await validateAdmin(req);

    if (response.status !== 200) {
      return NextResponse.json(
        { message: "Unauthorized. Please login again." },
        { status: 401 }
      );
    }

    const admin = await Admin.findById(response.id);

    if (!admin) {
      return NextResponse.json(
        { message: "Admin not found." },
        { status: 404 }
      );
    }

    const comment = await blogComment.findById(commentId);

    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found." },
        { status: 404 }
      );
    }

    comment.replies.push({
      actionBy: "admin",
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
