import React, { Suspense } from "react";
import BlogPost from "./BlogPost";
import BlogpostHeroSection from "./BlogpostHeroSection";
import CommentSection from "./CommentSection";
import Loading from "./loading";
import { notFound } from "next/navigation";
import ListenBlog from "./ListenBlog";
import { headers as getHeaders } from "next/headers";
const getBlogpost = async (permalink, options = {}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${permalink}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          incViews: options.incViews || false,
        },
        next: {
          revalidate: 60,
        },
      }
    );
    const data = await response.json();
    if (data.success) {
      return data.blog;
    }
    return null;
  } catch (error) {
    console.error("Error fetching blogpost:", error);
    return null;
  }
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { permalink } = await params;

  const blogpost = await getBlogpost(permalink, { incViews: false });

  if (!blogpost) {
    return {
      title: "Blog Not Found - Hey Sainty",
      description: "The blog post you're looking for is not available.",
      keywords: ["Blog Not Found", "Error", "Hey Sainty"],
      author: "Priyanshu Chaurasiya",
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${permalink}`,
      },
      openGraph: {
        type: "website",
        title: "Blog Not Found - Hey Sainty",
        description: "The blog post you're looking for is not available.",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${permalink}`,
        images: [
          {
            url: "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/hey-sainty-blog.png",
            width: 1200,
            height: 630,
            alt: "Hey Sainty Blog",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog Not Found - Hey Sainty",
        description: "The blog post you're looking for is not available.",
        images: [
          {
            url: "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/hey-sainty-blog.png",
            width: 1200,
            height: 630,
            alt: "Hey Sainty Blog",
          },
        ],
        creator: "@iam__sainty",
      },
      robots: "noindex, nofollow",
    };
  }

  const blogUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blogpost.permalink}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blogpost.title,
    description: blogpost.summary || "No description available.",
    author: {
      "@type": "Person",
      name: blogpost.author || "Priyanshu Chaurasiya",
    },
    url: blogUrl,
    publisher: {
      "@type": "Organization",
      name: "Hey Sainty",
      logo: {
        "@type": "ImageObject",
        url: "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/hey-sainty-logo.png",
        width: 1200,
        height: 630,
        alt: "Hey Sainty Logo",
      },
    },
    datePublished: blogpost.dateCreated,
    dateModified: blogpost.lastUpdated,
    image: [
      {
        url:
          blogpost.coverimage ||
          "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/hey-sainty-blog.png",
        width: 1200,
        height: 630,
        alt: "Hey Sainty Blog",
      },
    ],
    url: blogUrl,
    mainEntityOfPage: blogUrl,
    keywords: [
      ...blogpost.tag,
      "Tech",
      "Programming",
      "Development",
      "Blog",
      "Hey Sainty",
      "Priyanshu Chaurasiya",
    ],
  };

  return {
    title: `${blogpost.title} - Hey Sainty`,
    description: blogpost.summary || "No description available.",
    keywords: [
      "Hey Sainty",
      "Tech Blog",
      "Programming",
      "Development",
      "Blog",
      ...blogpost.title,
      ...blogpost.tag,
    ],
    author: blogpost.author || "Priyanshu Chaurasiya",
    canonical: blogUrl,
    openGraph: {
      type: "article",
      title: `${blogpost.title} - Hey Sainty`,
      description: blogpost.summary || "No description available.",
      url: blogUrl,
      images: [
        {
          url:
            blogpost.coverimage ||
            "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/hey-sainty-blog.png",
          width: 1200,
          height: 630,
          alt: "Hey Sainty Blog",
        },
      ],
      locale: "en_US",
      article: {
        published_time: blogpost.dateCreated,
        modified_time: blogpost.lastUpdated,
        section: "Technology",
        tag: blogpost.tag,
        author: blogpost.author || "Priyanshu Chaurasiya",
      },
    },
    twitter: {
      card: "summary_large_image",
      title: `${blogpost.title} - Hey Sainty`,
      description: blogpost.summary || "No description available.",
      images: [
        {
          url:
            blogpost.coverimage ||
            "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/hey-sainty-blog.png",
          width: 1200,
          height: 630,
          alt: "Hey Sainty Blog",
        },
      ],
      creator: "@iam__sainty",
    },
    jsonLd: JSON.stringify(jsonLd),
    robots: "index, follow",
  };
}

export default async function Page({ params }) {
  const { permalink } = await params;
  let incViews = false;
  const hostname = (await getHeaders()).get("host");
  if (
    hostname === "hey-sainty.vercel.app" ||
    hostname === "heysainty.com" ||
    hostname === "www.heysainty.com"
  ) {
    incViews = true;
  }

  const blogpost = await getBlogpost(permalink, { incViews: incViews });

  if (!blogpost) {
    notFound();
  }

  return (
    <div className="relative flex flex-col items-center w-full mb-20">
      <Suspense fallback={<Loading />}>
        <BlogpostHeroSection blogpost={blogpost} />
        <BlogPost blogpost={blogpost} />
        <CommentSection blogpost={blogpost} />
        <ListenBlog permalink={permalink} />
      </Suspense>
    </div>
  );
}
