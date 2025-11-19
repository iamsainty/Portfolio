import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import blogComment from "@/models/blogComment";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToMongo();

    const response = await validateAdmin(req);

    if (response.status !== 200) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please login again." },
        { status: 401 }
      );
    }

    const comments = await blogComment.find().sort({ createdAt: -1 });

    if (!comments || comments.length === 0) {
      return NextResponse.json(
        { success: false, message: "No comments found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, comments: comments },
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
