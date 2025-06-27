import { connectToMongo } from "@/lib/mongodb";
import Recipient from "@/models/emailNewsletterRecipient";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const { name, email } = await req.json();

    const recipient = await Recipient.findOne({ email });

    if (recipient) {
      if (recipient.isSubscribed) {
        return NextResponse.json(
          {
            success: false,
            message: "You are already subscribed to the newsletter",
          },
          { status: 400 }
        );
      }

      recipient.isSubscribed = true;
      recipient.unsubscribeReason = null;
      recipient.unsubscribedAt = null;
      recipient.subscribedAt = Date.now();

      if (recipient.userId) {
        const user = await User.findById(recipient.userId);

        user.emailPreferences.newBlogsEmail.subscribed = true;
        user.emailPreferences.newBlogsEmail.reason = "";
        user.emailPreferences.newBlogsEmail.unsubscribedAt = null;

        await user.save();
      }
      await recipient.save();

      return NextResponse.json(
        {
          success: true,
          message: "You have been subscribed to the newsletter",
        },
        { status: 201 }
      );
    }

    const user = await User.findOne({ email });

    await Recipient.create({
      name,
      email,
      userId: user ? user._id : null,
      subscribedAt: Date.now(),
      isSubscribed: true,
      unsubscribeReason: null,
      unsubscribedAt: null,
    });

    return NextResponse.json(
      {
        success: true,
        message: "You have been subscribed to the newsletter",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
