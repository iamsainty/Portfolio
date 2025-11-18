import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import Admin from "@/models/admin";
import blogComment from "@/models/blogComment";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const { commentId, commentReply } = await req.json();

    const response = await validateAdmin(req);

    if (response.status !== 200) {
      return NextResponse.json(
        { message: "Unauthorized. Please login again." },
        { status: 401 }
      );
    }

    const admin = await Admin.findById(response.id);

    if (!admin) {
      return NextResponse.json(
        { message: "Admin not found." },
        { status: 404 }
      );
    }

    const comment = await blogComment.findById(commentId);

    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found." },
        { status: 404 }
      );
    }

    comment.replies.push({
      actionBy: "admin",
      comment: commentReply,
      createdAt: new Date(),
    });

    await comment.save();

    const blog = await BlogPost.findOne({ permalink: comment.blogPermalink });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found." }, { status: 404 });
    }
    const user = await User.findById(comment.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    await AdminCommentReplyEmail(
      user.name,
      user.email,
      blog.title,
      blog.permalink
    );

    return NextResponse.json(
      { message: "Comment replied successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
