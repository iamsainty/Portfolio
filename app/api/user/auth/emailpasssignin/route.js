import { connectToMongo } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectToMongo();
    const jwtSecretKey = process.env.JWT_SECRET_KEY_USER;

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "No account found with this email." },
        { status: 404 }
      );
    }

    // Check if the user signed up via Google
    if (!user.password) {
      return NextResponse.json(
        { message: "This email is registered via Google Sign-In." },
        { status: 400 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Incorrect password. Please try again." },
        { status: 400 }
      );
    }

    const userToken = jwt.sign({ email: email, id: user._id }, jwtSecretKey);

    return NextResponse.json(
      { message: "Login successful", userToken },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
