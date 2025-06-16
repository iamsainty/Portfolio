import React from "react";
import BlogPost from "./BlogPost";
import BlogpostHeroSection from "./BlogpostHeroSection";
import CommentSection from "./CommentSection";

export async function generateMetadata({ params }) {
  const { permalink } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${permalink}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!data.success) {
    return {
      title: "Blog Not Found - Hey Sainty",
      description: "The blog post you're looking for is not available.",
      keywords: ["Blog Not Found", "Error", "Hey Sainty"],
    };
  }

  const blogpost = data.blog;

  // Handle blogpost not found
  if (blogpost.message) {
    return {
      title: "Blog Not Found - Hey Sainty",
      description: "The blog post you're looking for is not available.",
      keywords: ["Blog Not Found", "Error", "Hey Sainty"],
      author: "Priyanshu Chaurasiya",
      openGraph: {
        type: "website",
        title: "Blog Not Found - Hey Sainty",
        description: "The blog post you're looking for is not available.",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${permalink}`,
        image:
          "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog Not Found - Hey Sainty",
        description: "The blog post you're looking for is not available.",
        image:
          "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
        creator: "@iam__sainty",
      },
      robots: "noindex, nofollow",
    };
  }

  // For valid blog posts
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
    publisher: {
      "@type": "Organization",
      name: "Hey Sainty",
      logo: {
        "@type": "ImageObject",
        url: "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/hey-sainty-logo.png", // Adjust logo URL
      },
    },
    datePublished: blogpost.dateCreated,
    dateModified: blogpost.lastUpdated,
    image:
      blogpost.coverimage ||
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
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
      ...blogpost.tag, // Tags as additional keywords
    ],
    author: blogpost.author || "Priyanshu Chaurasiya",
    canonical: blogUrl,
    openGraph: {
      type: "article",
      title: `${blogpost.title} - Hey Sainty`,
      description: blogpost.summary || "No description available.",
      url: blogUrl,
      image:
        blogpost.coverimage ||
        "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
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
      image:
        blogpost.coverimage ||
        "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
      creator: "@iam__sainty",
    },
    jsonLd: JSON.stringify(jsonLd), // Adding JSON-LD structured data for rich snippets
    robots: "index, follow", // Ensure the page is indexed by search engines
  };
}

export default async function Page({ params }) {
  const { permalink } = await params;

  return (
    <div className="flex flex-col items-center w-full mb-20">
      <BlogpostHeroSection permalink={permalink} />
      <BlogPost permalink={permalink} />
      <CommentSection permalink={permalink} />
    </div>
  );
}
