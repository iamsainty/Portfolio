import BlogPost from "@/models/blogposts";
import Recipient from "@/models/emailNewsletterRecipient";
import sendNewsletter from "@/service/blogNewsletter";
import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import Admin from "@/models/admin";
export async function POST(req) {
  try {
    await connectToMongo();

    const { title, content, permalink } = await req.json();

    const adminValidation = await validateAdmin(req);

    if (!adminValidation) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized. Admin not found or does not exist.",
        },
        { status: 401 }
      );
    }

    const admin = await Admin.findById(adminValidation.id);

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Admin not found." },
        { status: 404 }
      );
    }

    if (!title || !content || !permalink) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const blog = await BlogPost.findOne({ permalink });

    const recipients = await Recipient.find();

    await Promise.all(
      recipients
        .filter((recipient) => recipient.isSubscribed)
        .map((recipient) =>
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
