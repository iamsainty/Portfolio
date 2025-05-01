import { connectToMongo } from "@/lib/mongodb";
import Recipient from "@/models/emailNewsletterRecipient";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const { recipientId } = await req.json();

    if (!recipientId) {
      return NextResponse.json(
        { message: "Missing recipientId." },
        { status: 400 }
      );
    }

    const recipient = await Recipient.findOne({ _id: recipientId });

    if (!recipient) {
      return NextResponse.json(
        { message: "Recipient not found." },
        { status: 404 }
      );
    }

    recipient.isSubscribed = true;
    await recipient.save();

    if (recipient.userId) {
      const user = await User.findOne({ _id: recipient.userId });
      if (user) {
        user.notificationPreferences.newBlogsEmail = true;
        await user.save();
      }
    }

    return NextResponse.json({
      message: "Resubscribed successfully.",
      recipient,
    });
  } catch (error) {
    console.error("Resubscribe error:", error);
    return NextResponse.json(
      { message: "Something went wrong.", error: error.message },
      { status: 500 }
    );
  }
}
