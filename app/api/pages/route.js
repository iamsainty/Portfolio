import { connectToMongo } from "@/lib/mongodb";
import Page from "@/models/pages";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToMongo();

    const pages = await Page.find().sort({ createdAt: -1 });

    if (!pages.length) {
      return NextResponse.json(
        { success: false, message: "No pages found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, pages: pages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch pages." },
      { status: 500 }
    );
  }
}
