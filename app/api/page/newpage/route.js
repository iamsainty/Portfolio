import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import Admin from "@/models/admin";
import Page from "@/models/pages";
import { pageCoverUpload } from "@/service/uploadToAWS";
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
    const description = requestData.get("description");
    const content = requestData.get("content");
    const permalink = requestData.get("permalink");
    const coverimage = requestData.get("coverimage");

    const imageUrl = await pageCoverUpload(coverimage, permalink);

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "Failed to upload image." },
        { status: 400 }
      );
    }

    const page = new Page({
      title,
      description,
      content,
      permalink,
      coverimage: imageUrl,
    });

    await page.save();

    return NextResponse.json(
      { success: true, message: "Page created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create page." },
      { status: 500 }
    );
  }
}
