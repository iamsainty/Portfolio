import React from "react";
import BlogHeroSection from "./BlogHeroSection";
import Blogs from "./Blogs";

export async function generateMetadata() {
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
    if (!data.success) {
      throw new Error("Failed to fetch blogs");
    }

    const blogs = data.blogs;
    const blogTitles = blogs.map((blog) => blog.title).join(", ");

    return {
      title: "Explore the Blog : Tech Stories, Tutorials, Guides and More",
      description:
        "Explore the Hey Sainty blog for insightful articles, coding tutorials, tech trends, and personal development projects. Dive into my experiences as a developer and tech enthusiast, and stay updated on the latest trends in technology, programming, and innovation.",
      keywords: [
        "Hey Sainty Blog",
        "Programming Blog",
        "Tech Trends",
        "Coding Tutorials",
        "Development Projects",
        "Tech Insights",
        "Priyanshu Chaurasiya",
        ...blogTitles.split(", "),
      ],
      author: "Priyanshu Chaurasiya",
      canonical: "https://hey-sainty.vercel.app/blog",
      openGraph: {
        type: "website",
        site_name: "Hey Sainty",
        title: "Blog - Tech, Tutorials, Guides & More",
        description:
          "Discover articles on coding, programming, tech trends, and personal projects. The Hey Sainty blog is your go-to resource for tech insights and development tutorials.",
        url: "https://hey-sainty.vercel.app/blog",
        image:
          "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog - Tech, Tutorials, Guides & More",
        description:
          "Explore a variety of blogs focused on tech trends, programming tutorials, and personal projects. Stay updated with my journey as a developer and tech enthusiast.",
        image:
          "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
        creator: "@iam__sainty",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    return {
      title: "Explore the Blog : Tech Stories, Tutorials, Guides and More",
      description:
        "Explore the Hey Sainty blog for insightful articles, coding tutorials, tech trends, and personal development projects. Stay updated with the latest trends in technology, programming, and innovation.",
      keywords: [
        "Hey Sainty Blog",
        "Programming Blog",
        "Tech Trends",
        "Coding Tutorials",
        "Development Projects",
        "Tech Insights",
        "Priyanshu Chaurasiya",
      ],
      author: "Priyanshu Chaurasiya",
      canonical: "https://hey-sainty.vercel.app/blog",
      openGraph: {
        type: "website",
        site_name: "Hey Sainty",
        title: "Blog - Tech, Tutorials, Guides & More",
        description:
          "Discover articles on coding, programming, tech trends, and personal projects. The Hey Sainty blog is your go-to resource for tech insights and development tutorials.",
        url: "https://hey-sainty.vercel.app/blog",
        image:
          "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog - Tech, Tutorials, Guides & More",
        description:
          "Explore a variety of blogs focused on tech trends, programming tutorials, and personal projects. Stay updated with my journey as a developer and tech enthusiast.",
        image:
          "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
        creator: "@iam__sainty",
      },
    };
  }
}

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <BlogHeroSection />
      <Blogs />
    </div>
  );
}
