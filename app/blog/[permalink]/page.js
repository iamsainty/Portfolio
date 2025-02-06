import React from "react";
import BlogPost from "./BlogPost";
import BlogpostHeroSection from "./BlogpostHeroSection";

async function fetchBlog(permalink) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${permalink}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const blogpost = await response.json();
  return blogpost;
}

export default async function Page({ params }) {
  const { permalink } = await params;
  const blogpost = await fetchBlog(permalink);

  return (
    <div className="flex flex-col items-center w-full">
      <BlogpostHeroSection blogpost={blogpost} />
      <BlogPost blogpost={blogpost} />
    </div>
  );
}
