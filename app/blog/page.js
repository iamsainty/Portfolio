import React, { Suspense } from "react";
import BlogHeroSection from "./BlogHeroSection";
import Blogs from "./Blogs";
import Loading from "./loading";

const fetchBlogs = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.success) {
      return data.blogs;
    }
    return null;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
};

export async function generateMetadata() {
  const blogs = await fetchBlogs();
  const blogTitles = blogs ? blogs.map((blog) => blog.title).join(", ") : "";

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
      ...blogTitles.split(", "),
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
  const blogs = await fetchBlogs();

  if (!blogs || blogs.length === 0) {
    return (
      <section>
        <h1>No blogs found</h1>
      </section>
    );
  }
  return (
    <div className="flex flex-col items-center">
      <BlogHeroSection />
      <Suspense fallback={<Loading />}>
        <Blogs blogs={blogs} />
      </Suspense>
    </div>
  );
}
