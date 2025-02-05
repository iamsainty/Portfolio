import { connectToMongo } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await connectToMongo();
    const blogs = await db.collection("blogposts").find().toArray();

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }
}
