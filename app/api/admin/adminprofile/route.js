import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import Admin from "@/models/admin";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToMongo();

    const validation = await validateAdmin(req);

    if (validation.status !== 200) {
      return NextResponse.json(
        { message: validation.message },
        { status: validation.status }
      );
    }

    const admin = await Admin.findById(validation.id);

    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({ admin }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
