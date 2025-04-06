import { connectToMongo } from "@/lib/mongodb";
import EmailOtp from "@/models/emailOtp";
import sendSignUpOtp from "@/service/sendOTP";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();
    const { name, email } = await req.json();

    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpSent = await sendSignUpOtp(name, email, otp);

    if (otpSent) {
      await EmailOtp.deleteMany({ email });

      await EmailOtp.create({
        name,
        email,
        otp,
      });

      return NextResponse.json(
        { message: "OTP has been sent" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Unable to send OTP. Please try again." },
      { status: 400 }
    );
  } catch (error) {
    console.error("OTP Error:", error);
    return NextResponse.json(
      { message: "Something went wrong while sending OTP" },
      { status: 500 }
    );
  }
}
