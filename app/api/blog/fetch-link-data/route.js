import { getLinkPreview } from "link-preview-js";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        {
          success: 0,
          message: "URL is required",
        },
        { status: 400 }
      );
    }

    const data = await getLinkPreview(url);

    return NextResponse.json(
      {
        success: 1,
        meta: {
          title: data.title || "",
          description: data.description || "",
          favicon: {
            url: data.favicons?.[0] || null,
          },
          url: data.url || url,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Link preview error:", error);
    return NextResponse.json(
      {
        success: 0,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
