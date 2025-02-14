import { connectToMongo } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectToMongo();
    const jwtSecretKey = process.env.JWT_SECRET_KEY_USER;

    const { name, email, password } = await req.json();

    const userExist = await User.findOne({ email });

    if (userExist) {
      if (userExist.password === null) {
        return NextResponse.json(
          { message: "This email is already registered via Google Sign-In" },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    const userToken = jwt.sign({ email: email, id: user._id }, jwtSecretKey);

    return NextResponse.json(userToken, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
