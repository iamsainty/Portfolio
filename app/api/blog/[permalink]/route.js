import { connectToMongo } from "@/lib/mongodb";
import BlogPost from "@/models/blogposts";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToMongo();
    const { permalink } = await params;

    const blogPost = await BlogPost.findOne({ permalink });
    if (!blogPost) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }
    const currentTime = new Date();
    const lastViewedTime = blogPost.lastViewed
      ? new Date(blogPost.lastViewed)
      : new Date(0);

    const timeDifference = currentTime - lastViewedTime;

    if (timeDifference > 10000) {
      blogPost.views += 1;
      blogPost.lastViewed = currentTime;
      await blogPost.save();
    }

    return NextResponse.json(blogPost, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
