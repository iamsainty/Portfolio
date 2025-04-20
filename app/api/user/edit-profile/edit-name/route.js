import { connectToMongo } from "@/lib/mongodb";
import { validateUsertoken } from "@/middleware/validateUsertoken";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const { name } = await req.json();

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
    user.name = name;

    const notification = {
      type: "nameUpdated",
      createdAt: new Date(),
    };

    user.notifications.push(notification);

    await user.save();

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 }
    );
  }
}
