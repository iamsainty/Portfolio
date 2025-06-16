import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import Admin from "@/models/admin";
import BlogPost from "@/models/blogposts";
import { blogCoverUpload } from "@/service/uploadToAWS";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const adminValidation = await validateAdmin(req);

    if (!adminValidation) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized. Admin not found or does not exist.",
        },
        { status: 401 }
      );
    }

    const admin = await Admin.findById(adminValidation.id);

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Admin not found." },
        { status: 404 }
      );
    }

    const requestData = await req.formData();

    const title = requestData.get("title");
    const summary = requestData.get("summary");
    const content = requestData.get("content");
    const tags = requestData.get("tags");
    const permalink = requestData.get("permalink");
    const coverimage = requestData.get("coverimage");

    const imageUrl = await blogCoverUpload(coverimage, permalink);

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "Failed to upload image." },
        { status: 400 }
      );
    }

    const blogpost = new BlogPost({
      author: admin.name,
      title,
      summary,
      content,
      tag: tags.split(",").map((tag) => tag.trim()),
      permalink,
      coverimage: imageUrl,
    });

    await blogpost.save();

    return NextResponse.json(
      { success: true, message: "Blog created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
