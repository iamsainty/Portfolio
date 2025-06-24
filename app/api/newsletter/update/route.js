import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import Admin from "@/models/admin";
import Recipient from "@/models/emailNewsletterRecipient";
import User from "@/models/user";
import sendUpdateEmail from "@/service/newsletter/updateEmail";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const { title, content, link } = await req.json();

    const adminValidation = await validateAdmin(req);

    if (!adminValidation) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const admin = await Admin.findById(adminValidation.id);

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not found",
        },
        { status: 404 }
      );
    }

    const users = await User.find();

    await Promise.all(
      users.map((user) => {
        sendUpdateEmail(user.name, user.email, title, content, link);
      })
    );

    return NextResponse.json(
      {
        success: true,
        message: "Newsletter sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending newsletter:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send newsletter",
      },
      { status: 500 }
    );
  }
}
