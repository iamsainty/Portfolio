import { connectToMongo } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectToMongo();

    const jwtSecretKey = process.env.JWT_SECRET_KEY_USER;

    const { name, email, googleId, profilePicture } = await req.json();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const user = await User.create({
        name,
        email,
        googleId,
        profilePicture,
      });

      const notification = {
        type: "welcomeMessage",
        createdAt: new Date(),
      };

      user.notifications.push(notification);

      await user.save();

      const userToken = jwt.sign({ email: email, id: user._id }, jwtSecretKey);

      return NextResponse.json({ userToken }, { status: 201 });
    }

    if (existingUser.name === null) {
      existingUser.name = name;
    }
    if (
      existingUser.profilePicture ===
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/profile-pictures/default-profile-picture-hey-sainty.png"
    ) {
      existingUser.profilePicture = profilePicture;
    }
    if (existingUser.googleId === null) {
      existingUser.googleId = googleId;

      const notification = {
        type: "googleLinked",
        createdAt: new Date(),
      };

      existingUser.notifications.push(notification);
    }

    await existingUser.save();

    const userToken = jwt.sign(
      { email: email, id: existingUser._id },
      jwtSecretKey
    );

    return NextResponse.json({ userToken }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
