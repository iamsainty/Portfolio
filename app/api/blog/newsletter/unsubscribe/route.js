import { connectToMongo } from "@/lib/mongodb";
import Recipient from "@/models/emailNewsletterRecipient";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const { recipientId, reason } = await req.json();

    if (!recipientId || !reason) {
      return NextResponse.json(
        { message: "Missing recipientId or reason." },
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

    recipient.isSubscribed = false;
    recipient.unsubscribeReason = reason;

    await recipient.save();

    if (recipient.userId) {
      const user = await User.findOne({ _id: recipient.userId });

      if (user) {
        user.notificationPreferences.newBlogsEmail = false;
        await user.save();
      }
    }

    return NextResponse.json(
      { message: "Unsubscribed successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error unsubscribing:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
