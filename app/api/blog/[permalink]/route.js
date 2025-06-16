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
        {
          success: false,
          error: "Blog post not found. Please check the URL.",
        },
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

    return NextResponse.json(
      { success: true, blog: blogPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
