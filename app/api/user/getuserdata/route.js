import { connectToMongo } from "@/lib/mongodb";
import { validateUsertoken } from "@/middleware/validateUsertoken";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToMongo();

    const response = await validateUsertoken(req);
    if (response.status !== 200) {
      return NextResponse.json(
        { message: response.message },
        { status: response.status }
      );
    }

    const user = await User.findById(response.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching user" },
      { status: 500 }
    );
  }
}
