import { connectToMongo } from "@/lib/mongodb";
import blogComment from "@/models/blogComment";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToMongo();

    const { permalink } = await params;

    const comments = await blogComment.find({ permalink }).sort({ createdAt: -1 });

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
