import React from "react";
import BlogPost from "./BlogPost";
import BlogpostHeroSection from "./BlogpostHeroSection";

export default async function Page({ params }) {
  const { permalink } = await params;

  return (
    <div className="flex flex-col items-center w-full mb-20">
      <BlogpostHeroSection permalink={permalink} />
      <BlogPost permalink={permalink} />
    </div>
  );
}
