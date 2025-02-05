import React from "react";
import BlogHeroSection from "./BlogHeroSection";
import Blogs from "./Blogs";

async function fetchBlogs() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const blogs = await response.json();
  return blogs;
}

export default async function Page() {
  const blogs = await fetchBlogs(); // Fetching blogs directly in the server-side component

  return (
    <div className="flex flex-col items-center">
      <BlogHeroSection />
      <Blogs blogs={blogs} />
    </div>
  );
}