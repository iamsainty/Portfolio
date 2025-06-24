import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import Admin from "@/models/admin";
import BlogPost from "@/models/blogposts";
import { generateBlogTTS } from "@/service/blog-tts";
import { blogCoverUpload } from "@/service/uploadToAWS";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await connectToMongo();

    const { permalink } = await params;

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
    const coverimage = requestData.get("coverimage");

    const blogpost = await BlogPost.findOne({ permalink });

    let imageUrl = blogpost.coverimage;

    if (coverimage) {
      imageUrl = await blogCoverUpload(coverimage, permalink);
    }

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "Failed to upload image." },
        { status: 400 }
      );
    }

    const ttsUrl = await generateBlogTTS(title, content, permalink);

    if (!ttsUrl) {
      return NextResponse.json(
        { success: false, error: "Failed to generate TTS." },
        { status: 400 }
      );
    }

    blogpost.title = title;
    blogpost.summary = summary;
    blogpost.content = content;
    blogpost.tag = tags.split(",").map((tag) => tag.trim());
    blogpost.coverimage = imageUrl;
    blogpost.lastUpdated = new Date();
    blogpost.ttsUrl = ttsUrl;
    await blogpost.save();

    return NextResponse.json(
      { success: true, message: "Blog updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
