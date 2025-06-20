import { connectToMongo } from "@/lib/mongodb";
import Page from "@/models/pages";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToMongo();

    const { permalink } = params;

    const page = await Page.findOne({ permalink });

    if (!page) {
      return NextResponse.json(
        { success: false, message: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, page: page }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
