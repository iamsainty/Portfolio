import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RxReader } from "react-icons/rx";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const blogs = [
  {
    title: "Blog 1",
    description: "This is a description of blog 1",
    imageUrl:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    blogUrl: "https://linktoblog1.com",
  },
  {
    title: "Blog 2",
    description: "This is a description of blog 2",
    imageUrl:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    blogUrl: "https://linktoblog2.com",
  },
  {
    title: "Blog 3",
    description: "This is a description of blog 3",
    imageUrl:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    blogUrl: "https://linktoblog3.com",
  },
  {
    title: "Blog 4",
    description: "This is a description of blog 4",
    imageUrl:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    blogUrl: "https://linktoblog4.com",
  },
];

const BlogSection = () => {
  return (
    <section className="w-[85vw] lg:w-[75vw] flex flex-col lg:flex-row justify-between gap-16 mx-auto">
      {/* Left Side - Sticky Content */}
      <div className="lg:h-[75vh] w-full lg:w-5/12 flex flex-col justify-center items-center lg:sticky top-24 gap-5">
        <h2 className="font-bold lg:font-extrabold text-2xl sm:text-3xl lg:text-4xl">
          Blog
        </h2>
        <p className="mt-4 text-lg text-center">
          Read my latest blogs on web development, programming, and technology.
        </p>
        <Link href={"/blogs"}>
          <Button className="mt-4">View all blogs</Button>
        </Link>
      </div>

      {/* Right Side - Scrolling Content */}
      <div className="w-full flex flex-col items-center lg:w-7/12 gap-10 lg:px-10 overflow-auto">
        {blogs.map((blog) => (
          <Card key={blog.title} className="w-full">
            <CardHeader>
              <CardTitle className="text-md lg:text-xl font-bold">
                {blog.title}
              </CardTitle>
              <CardDescription className="text-sm lg:text-lg text-muted-foreground">
                {blog.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-auto object-cover rounded-lg shadow-md"
                height={200}
                width={300}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
