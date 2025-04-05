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
        { message: "Account with this email does not exist" },
        { status: 404 }
      );
    }

    if (user.password) {
      return NextResponse.json({ message: "" }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Account with this email already exists" },
      { status: 500 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
