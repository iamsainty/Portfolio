import React from "react";
import BlogHeroSection from "./BlogHeroSection";
import Blogs from "./Blogs";

export default async function Page() {
  return (
    <div className="flex flex-col items-center">
      <BlogHeroSection />
      <Blogs />
    </div>
  );
}
