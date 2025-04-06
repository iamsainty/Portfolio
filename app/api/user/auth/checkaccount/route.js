import { connectToMongo } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const { email } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "No account associated with this email.", status: "error" },
        { status: 404 }
      );
    }

    if (user.password) {
      return NextResponse.json(
        {
          message: "An account already exists with this email.",
          status: "error",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "This email is linked to a Google account.", status: "error" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Check account error:", error);
    return NextResponse.json(
      {
        message: "Unable to process your request. Please try again.",
        status: "error",
      },
      { status: 500 }
    );
  }
}
