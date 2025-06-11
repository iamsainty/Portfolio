import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import BlogPost from "@/models/blogposts";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectToMongo();

    const adminValidation = await validateAdmin(req);

    if (adminValidation.status !== 200) {
      return NextResponse.json(
        { success: false, error: adminValidation.message },
        { status: adminValidation.status }
      );
    }

    const { blogId } = await req.json();

    await BlogPost.findByIdAndDelete(blogId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error during blog deletion:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
