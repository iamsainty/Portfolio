import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RxReader } from "react-icons/rx";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { IoEyeOutline, IoTimeOutline } from "react-icons/io5";
import { FaRegComments } from "react-icons/fa";

const blogs = [
  {
    title: "Blog 1",
    description:
      "This is a description of blog 1 this can be long enough and also this much long",
    imageUrl:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    blogUrl: "https://linktoblog1.com",
    publishDate: Date.now(),
    views: "19",
    comments: "5",
  },
  {
    title: "Blog 2",
    description: "This is a description of blog 2",
    imageUrl:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    blogUrl: "https://linktoblog2.com",
    publishDate: Date.now(),
    views: "34",
    comments: "3",
  },
  {
    title: "Blog 3",
    description: "This is a description of blog 3",
    imageUrl:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    blogUrl: "https://linktoblog3.com",
    publishDate: Date.now(),
    views: "15",
    comments: "8",
  },
];

const BlogSection = () => {
  return (
    <section className="sticky top-[5vh] lg:top-[10vh] bg-white dark:bg-black w-[85vw] lg:w-[75vw] flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-12 py-[5vh] mx-auto min-h-[100vh]">
      {/* Left Side - Sticky Content */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center items-center gap-5">
        <h2 className="font-bold lg:font-extrabold text-3xl lg:text-4xl text-center">
          Blog
        </h2>
        <p className="mt-4 text-base lg:text-lg text-center">
          I write blog articles about tech, lifestyle, and tutorials, sharing my
          journey of learning and discovering new tools and trends{" "}
        </p>
        <Link href={"/blogs"} className="hidden lg:flex">
          <Button className="mt-4">View all blogs</Button>
        </Link>
      </div>

      {/* Right Side - Scrolling Content */}
      <ScrollArea className="w-full lg:w-3/5 whitespace-nowrap">
        <div className="flex min-w-full space-x-3 lg:space-x-5">
          {blogs.map((blog) => (
            <Card
              key={blog.title}
              className="border-2 dark:border-2 w-[80vw] lg:w-[30vw]"
            >
              <CardHeader>
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                  height={200}
                  width={300}
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-md lg:text-xl font-bold text-wrap">
                  {blog.title}
                </CardTitle>
                <CardDescription className="text-sm lg:text-lg text-muted-foreground text-wrap">
                  {blog.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <IoTimeOutline className="text-base " />
                  <span className="font-medium">
                    {new Date(blog.publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <IoEyeOutline className="text-base " />
                  <span className="font-medium">
                    {blog.views.toLocaleString()} views
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegComments className="text-base " />
                  <span className="font-medium">
                    {blog.comments.toLocaleString()} comments
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Link href={"/blogs"} className="lg:hidden">
        <Button>View all blogs</Button>
      </Link>
    </section>
  );
};

export default BlogSection;
