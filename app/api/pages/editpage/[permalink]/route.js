import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import Admin from "@/models/admin";
import Page from "@/models/pages";
import { pageCoverUpload } from "@/service/uploadToAWS";
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
    const description = requestData.get("description");
    const content = requestData.get("content");
    const coverimage = requestData.get("coverimage");

    const page = await Page.findOne({ permalink });

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found." },
        { status: 404 }
      );
    }

    let imageUrl = page.coverimage;

    if (coverimage) {
      imageUrl = await pageCoverUpload(coverimage, permalink);
    }

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "Failed to upload image." },
        { status: 400 }
      );
    }

    page.title = title;
    page.description = description;
    page.content = content;
    page.coverimage = imageUrl;
    page.lastUpdated = new Date();

    await page.save();

    return NextResponse.json(
      { success: true, message: "Page updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update page." },
      { status: 500 }
    );
  }
}
