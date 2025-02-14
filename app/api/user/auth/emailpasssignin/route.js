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
        { message: "User with  this email does not exist" },
        { status: 404 }
      );
    }

    if (user && user.password === null) {
      return NextResponse.json(
        { message: "This email is linked with Google Sign-In" },
        { status: 400 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    const userToken = jwt.sign({ email: email, id: user._id }, jwtSecretKey);

    return NextResponse.json(userToken, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
