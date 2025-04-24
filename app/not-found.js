import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Page Not Found - Hey Sainty",
  description:
    "Oops! The page you're looking for doesn't exist. It may have been moved or deleted.",
  keywords: ["404", "Page Not Found", "Error", "Hey Sainty", "Tech Blog"],
  author: "Priyanshu Chaurasiya",
  canonical: "https://hey-sainty.vercel.app/404", // Ensure to set your 404 page URL
  openGraph: {
    type: "website",
    title: "Page Not Found - Hey Sainty",
    description:
      "Oops! The page you're looking for doesn't exist. It may have been moved or deleted.",
    image:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png", // You can use an image for the 404 page
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Not Found - Hey Sainty",
    description:
      "Oops! The page you're looking for doesn't exist. It may have been moved or deleted.",
    image:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png", // Twitter image for 404 page
    creator: "@iam__sainty",
  },
  robots: "noindex, nofollow", // Don't want search engines to index the 404 page
};

const NotFound = () => {
  return (
    <section className="min-h-[85vh] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-2xl lg:text-4xl font-bold mb-6">Oops!</h1>
      <p className="text-lg lg:text-xl  mb-2">
        The page you are looking for does not exist or has been removed.
      </p>
      <p className="text-lg lg:text-xl mb-6">
        Don&apos;t worry, there is lot more to explore on this website.
      </p>
      <Link href={"/"}>
        <Button className="font-bold">Back to Home</Button>
      </Link>
    </section>
  );
};

export default NotFound;
