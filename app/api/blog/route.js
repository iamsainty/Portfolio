import { connectToMongo } from "@/lib/mongodb";
import BlogPost from "@/models/blogposts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToMongo();
    const blogs = await BlogPost.find().sort({ dateCreated: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
