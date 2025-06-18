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
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { email: admin.email, id: admin._id, role: admin.role },
      jwtSecretKey
    );

    const cookieStore = await cookies();
    cookieStore.set("adminToken", token, {
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json(
      { success: true, token: token, admin: admin },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
