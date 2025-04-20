import { connectToMongo } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import EmailOtp from "@/models/emailOtp";

export async function POST(req) {
  try {
    await connectToMongo();
    const jwtSecretKey = process.env.JWT_SECRET_KEY_USER;

    const { name, email, password, otp } = await req.json();

    console.log(name, email, password, otp);

    const emailOtp = await EmailOtp.findOne({ email });
    if (emailOtp && emailOtp.otp != otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    const notification = {
      type: "welcomeMessage",
      createdAt: new Date(),
    };

    user.notifications.push(notification);

    await user.save();

    const userToken = jwt.sign({ email: email, id: user._id }, jwtSecretKey);

    return NextResponse.json(
      {
        message: "Signup successful",
        userToken: userToken,
        status: "success",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Something went wrong", status: "error" },
      { status: 500 }
    );
  }
}
