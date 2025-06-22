import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import Admin from "@/models/admin";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
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

    const users = await User.find().sort({ createdAt: -1 });

    if (!users) {
      return NextResponse.json(
        { success: false, error: "No users found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, users: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
