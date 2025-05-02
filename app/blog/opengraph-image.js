import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Blog - Hey Sainty";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function ogImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0f0f0f, #1f1f1f)",
          border: "1px solid white",
          color: "#ffffff",
          fontFamily: '"Inter", sans-serif',
          padding: "40px 60px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          Hey Sainty
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          Explore the Blog: Tech Stories, Guides, and More
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 20,
            fontWeight: 400,
            color: "#cccccc",
            maxWidth: "800px",
            lineHeight: 1.5,
          }}
        >
          Discover tutorials, coding tips, and inspiration from a dev’s journey.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
