import BlogPost from "@/models/blogposts";
import Recipient from "@/models/emailNewsletterRecipient";
import sendNewsletter from "@/service/blogNewsletter";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, content, permalink } = await req.json();

    if (!title || !content || !permalink) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const blog = await BlogPost.findOne({ permalink: permalink });

    const recipients = await Recipient.find();

    await Promise.all(
      recipients.map((recipient) =>
        sendNewsletter(
          recipient.name,
          recipient.email,
          title,
          content,
          permalink,
          blog.coverimage,
          recipient._id.toString()
        )
      )
    );

    return NextResponse.json(
      { message: "Newsletter sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending newsletter:", error);
    return NextResponse.json(
      { message: "Failed to send newsletter" },
      { status: 500 }
    );
  }
}
