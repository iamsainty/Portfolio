import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import Projects from "@/models/projects";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectToMongo();

    const adminValidation = await validateAdmin(req);

    if (adminValidation.status !== 200) {
      return NextResponse.json(
        { success: false, error: adminValidation.message },
        { status: adminValidation.status }
      );
    }

    const { projectId } = await req.json();

    await Projects.findByIdAndDelete(projectId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error during project deletion:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
