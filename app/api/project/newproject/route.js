import { connectToMongo } from "@/lib/mongodb";
import { validateAdmin } from "@/middleware/validateAdmin";
import Projects from "@/models/projects";
import { uploadProjectImage } from "@/service/uploadToAWS";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();

    const response = await validateAdmin(req);

    if (response.status !== 200) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const technologiesString = formData.get("technologies");
    const permalink = formData.get("permalink");
    const liveLink = formData.get("liveLink");
    const githubRepo = formData.get("githubRepo");
    const projectBlog = formData.get("projectBlog");
    const status = formData.get("status");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");

    const technologies = technologiesString
      ? technologiesString.split(",").map((tech) => tech.trim())
      : [];

    const image = formData.get("image");

    const imageUrl = await uploadProjectImage(image, permalink);

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
      image: imageUrl,
    });

    await newProject.save();

    return NextResponse.json({
      success: true,
      message: "Project added successfully",
    });
  } catch (error) {
    console.error("Error adding project:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error adding project",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
