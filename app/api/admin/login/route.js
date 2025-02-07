import Admin from "@/models/admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Ensure bcrypt is imported
import jwt from "jsonwebtoken"; // Use ES6 import
import { connectToMongo } from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectToMongo();

    const { email, password } = await req.json();
    const jwtSecretKey = process.env.JWT_SECRET_KEY_ADMIN;

    if (!jwtSecretKey) {
      console.error("JWT secret key is missing");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    const user = await Admin.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      jwtSecretKey
    );

    cookies().set("adminToken", token, {
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
