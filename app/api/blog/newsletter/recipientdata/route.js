import { connectToMongo } from "@/lib/mongodb";
import Recipient from "@/models/emailNewsletterRecipient";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const { recipientId } = await req.json();

    if (!recipientId) {
      return NextResponse.json(
        { error: "Recipient ID is required." },
        { status: 400 }
      );
    }

    const recipient = await Recipient.findById(recipientId);

    if (!recipient) {
      return NextResponse.json(
        { error: "Recipient not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Recipient found successfully.",
      recipient,
    });
  } catch (error) {
    console.error("Error fetching recipient:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the recipient." },
      { status: 500 }
    );
  }
}
