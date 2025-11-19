import { connectToMongo } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectToMongo();

    const { userId } = await params;

    const user = await User.findById(userId);

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
