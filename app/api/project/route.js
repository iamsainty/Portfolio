import { connectToMongo } from "@/lib/mongodb";
import Projects from "@/models/projects";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    // Connect to MongoDB
    await connectToMongo();

    // Parse form data
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const technologiesString = formData.get("technologies");
    const permalink = formData.get("permalink");
    const liveLink = formData.get("liveLink");
    const githubRepo = formData.get("githubRepo");
    const projectBlog = formData.get("projectBlog");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    const status = formData.get("status");

    // Convert technologies to an array if present
    const technologies = technologiesString
      ? technologiesString.split(",").map((tech) => tech.trim())
      : [];

    // Create new project document
    const newProject = new Projects({
      title,
      description,
      technologies,
      permalink,
      liveLink,
      githubRepo,
      projectBlog,
      startDate,
      endDate,
      status,
    });

    // Save to database
    await newProject.save();

    // Return success response
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error adding project:", error);
    return NextResponse.json(
      { message: "Error adding project", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToMongo();

    const projects = await Projects.find().sort({ startDate: -1 });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Error fetching projects", error: error.message },
      { status: 500 }
    );
  }
}
