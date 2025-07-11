"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
import { Skeleton } from "@/components/ui/skeleton";

async function getBlogs() {
  try {
    const response = await fetch("/api/blog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      return data.blogs;
    } else {
      throw new Error("Failed to fetch blogs");
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs().then((blogs) => {
      setBlogs(blogs);
      setLoading(false);
    });
  }, []);
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
        <Link href={"/blog"} className="hidden lg:flex">
          <Button className="mt-4">View all blogs</Button>
        </Link>
      </div>

      {/* Right Side - Scrolling Content */}
      <ScrollArea className="w-full lg:w-3/5 whitespace-nowrap p-4">
        <div className="flex min-w-full space-x-3 lg:space-x-5">
          {loading ? (
            <>
              {[...Array(5)].map((_, index) => (
                <Card
                  key={index}
                  className="border-2 dark:border-2 w-[85vw] lg:w-[27vw] shadow-sm"
                >
                  <CardHeader>
                    <Skeleton className="w-full h-36 lg:h-44" />
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3 my-1">
                    <CardTitle className="text-md lg:text-lg font-bold text-wrap">
                      <Skeleton className="w-4/5 h-8" />
                    </CardTitle>
                    <CardDescription className="text-sm lg:text-md text-wrap text-muted-foreground">
                      <Skeleton className="w-full h-16" />
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-3 text-xs md:text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </>
          ) : (
            <>
              {blogs.map((blog) => (
                <Link key={blog._id} href={`/blog/${blog.permalink}`}>
                  <Card className="border-2 dark:border-2 w-[85vw] lg:w-[27vw] shadow-sm">
                    <CardHeader>
                      <Image
                        src={blog.coverimage}
                        alt={blog.title}
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                        height={200}
                        width={300}
                      />
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <CardTitle
                        className="text-md lg:text-lg font-bold text-wrap line-clamp-2"
                        aria-label="blog title"
                      >
                        {blog.title}
                      </CardTitle>
                      <CardDescription
                        className="text-sm lg:text-md text-wrap text-muted-foreground line-clamp-2"
                        aria-label="blog summary"
                      >
                        {blog.summary}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <IoTimeOutline className="text-base " />
                        <span className="font-medium">
                          {new Date(blog.dateCreated).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
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
                </Link>
              ))}
            </>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Link href={"/blog"} className="lg:hidden">
        <Button>View all blogs</Button>
      </Link>
    </section>
  );
};

export default BlogSection;
