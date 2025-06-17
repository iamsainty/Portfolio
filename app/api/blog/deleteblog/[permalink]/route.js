import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import BlogPost from "@/models/blogposts";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectToMongo();

    const adminValidation = await validateAdmin(req);

    if (adminValidation.status !== 200) {
      return NextResponse.json(
        { success: false, error: adminValidation.message },
        { status: adminValidation.status }
      );
    }

    const permalink = await params.permalink;

    const blog = await BlogPost.findOne({ permalink });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    await BlogPost.findByIdAndDelete(blog._id);

    return NextResponse.json(
      { success: true, message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
