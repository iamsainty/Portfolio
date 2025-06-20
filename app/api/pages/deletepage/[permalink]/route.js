import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import Admin from "@/models/admin";
import Page from "@/models/pages";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
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

    const page = await Page.findOne({ permalink });

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found." },
        { status: 404 }
      );
    }

    await Page.deleteOne({ permalink });

    return NextResponse.json(
      { success: true, message: "Page deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete page." },
      { status: 500 }
    );
  }
}
