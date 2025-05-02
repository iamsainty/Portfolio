import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongodb";
import Recipient from "@/models/emailNewsletterRecipient";
import User from "@/models/user";
import sendNewsletterWelcome from "@/service/blogNewsletterWelcome";

export async function POST(req) {
  try {
    await connectToMongo();

    const { name, email } = await req.json();

    // if (!name || !email) {
    //   return NextResponse.json(
    //     { message: "Name or email missing" },
    //     { status: 400 }
    //   );
    // }

    // const existing = await Recipient.findOne({ email });
    // if (existing) {
    //   return NextResponse.json(
    //     { message: "Email already subscribed" },
    //     { status: 409 }
    //   );
    // }

    // const recipient = await Recipient.create({ name, email });

    await sendNewsletterWelcome(name, email);

    // const user = await User.findOne({ email });
    // if (user) {
    //   recipient.userId = user._id;
    //   user.notificationPreferences.newBlogsEmail = true;

    //   await user.save();
    //   await recipient.save();
    // }

    return NextResponse.json(
      { message: "Subscribed successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error occurred" },
      { status: 500 }
    );
  }
}
