import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import Admin from "@/models/admin";
import BlogPost from "@/models/blogposts";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    let requestData;
    try {
      requestData = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload. Please check your request body." },
        { status: 400 }
      );
    }

    const { title, summary, content, tags, permalink, imageUrl } = requestData;

    if (!title || !summary || !content || !tags || !permalink || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields. Ensure all fields are provided." },
        { status: 400 }
      );
    }

    const response = await validateAdmin(req);
    if (!response?.id) {
      return NextResponse.json(
        { error: "Admin validation failed. Invalid or missing credentials." },
        { status: 401 }
      );
    }

    const admin = await Admin.findById(response.id);
    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized. Admin not found or does not exist." },
        { status: 401 }
      );
    }

    const blog = new BlogPost({
      coverimage: imageUrl,
      author: admin.name,
      title,
      summary,
      content,
      tag: tags.split(",").map((tag) => tag.trim()),
      permalink,
    });

    const newBlog = await blog.save();
    return NextResponse.json(
      { message: "Blog created successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
