import { connectToMongo } from "@/lib/mongodb";
import { validateUsertoken } from "@/middleware/validateUsertoken";
import User from "@/models/user";
import { deleteUserProfileAWS } from "@/service/deleteFromAWS";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const { newPictureUrl } = await req.json();
    if (!newPictureUrl) {
      return NextResponse.json(
        { message: "newPictureUrl is required" },
        { status: 400 }
      );
    }

    const response = await validateUsertoken(req);
    if (response.status !== 200) {
      return NextResponse.json(
        { message: response.message },
        { status: response.status }
      );
    }

    const user = await User.findById(response.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const prevPictureUrl = user.profilePicture;

    if (prevPictureUrl?.includes("amazonaws.com")) {
      try {
        await deleteUserProfileAWS(prevPictureUrl);
      } catch (err) {
        console.warn("Failed to delete old picture from AWS:", err);
      }
    }

    user.profilePicture = newPictureUrl;
    await user.save();

    return NextResponse.json({
      message: "Profile picture updated successfully",
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return NextResponse.json(
      { message: "Failed to update profile picture" },
      { status: 500 }
    );
  }
}
