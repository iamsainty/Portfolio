import { connectToMongo } from "@/lib/mongodb";
import BlogPost from "@/models/blogposts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToMongo();

    const blogs = await BlogPost.find().sort({ dateCreated: -1 });

    if (!blogs.length) {
      return NextResponse.json(
        { success: false, message: "No blog posts found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
