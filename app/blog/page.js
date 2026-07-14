import React from "react";
import Blogs from "./Blogs";
import HeroSection from "@/components/common/HeroSection";
import blogHeroConfig from "@/config/hero/blogHero";

export async function generateMetadata() {
  return {
    title: "Hey Sainty Blog - Tech Stories, Tutorials, Guides and More",
    description:
      "Read developer blogs on coding, web development, tech tutorials, and personal projects. Follow my journey as a tech enthusiast and stay updated on trends.",
    keywords: [
      "Hey Sainty Blog",
      "Web Development Blog",
      "JavaScript Tutorials",
      "Tech Trends",
      "Coding Tutorials",
      "Frontend Projects",
      "Development Projects",
      "Full Stack Developer",
      "Next.js Blog",
      "React Blog",
      "Tech Insights",
      "Priyanshu Chaurasiya",
    ],
    author: "Priyanshu Chaurasiya",
    canonical: "https://www.heysainty.com/blog",
    openGraph: {
      type: "website",
      site_name: "Hey Sainty",
      title: "Hey Sainty Blog - Tech Stories, Tutorials, Guides and More",
      description:
        "Read developer blogs on coding, web development, tech tutorials, and personal projects. Follow my journey as a tech enthusiast and stay updated on trends.",
      url: "https://www.heysainty.com/blog",
      images: [
        {
          url: "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/hey-sainty-blog.png",
          width: 1200,
          height: 630,
          alt: "Hey Sainty Blog - Tech Stories, Tutorials, Guides and More",
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: "Hey Sainty Blog - Tech Stories, Tutorials, Guides and More",
      description:
        "Read developer blogs on coding, web development, tech tutorials, and personal projects. Follow my journey as a tech enthusiast and stay updated on trends.",
      images: [
        "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/hey-sainty-blog.png",
      ],
      creator: "@iam__sainty",
    },
  };
}

export default async function Page() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection data={blogHeroConfig} />
      <Blogs />
    </div>
  );
}
