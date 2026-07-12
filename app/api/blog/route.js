import { connectToMongo } from "@/lib/mongodb";
import BlogPost from "@/models/blogposts";
import { NextResponse } from "next/server";

const PAGE_SIZE = 6;

export async function GET(request) {
  try {
    await connectToMongo();

    const { searchParams } = new URL(request.url);

    const page = Math.max(parseInt(searchParams.get("page")) || 1, 1);
    const skip = (page - 1) * PAGE_SIZE;

    const blogs = await BlogPost.find(
      { status: "published" },
      {
        coverImage: 1,
        lastUpdated: 1,
        title: 1,
        summary: 1,
        permalink: 1,
        tags: 1,
        views: 1,
        comments: 1,
      }
    )
      .sort({ dateCreated: -1 })
      .skip(skip)
      .limit(PAGE_SIZE)
      .lean();

    const totalBlogs = await BlogPost.countDocuments({
      status: "published",
    });

    return NextResponse.json(
      {
        success: true,
        blogs,
        pagination: {
          currentPage: page,
          pageSize: PAGE_SIZE,
          totalBlogs,
          totalPages: Math.ceil(totalBlogs / PAGE_SIZE),
          hasNextPage: page * PAGE_SIZE < totalBlogs,
          hasPreviousPage: page > 1,
        },
      },
      { status: 200 }
    );
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
