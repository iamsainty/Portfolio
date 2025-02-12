"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlog } from "@/context/blogContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaRegComments } from "react-icons/fa";
import { IoEyeOutline, IoTimeOutline } from "react-icons/io5";

const Blogs = () => {
  const { blogs, getBlogs, loading } = useBlog();
  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line
  }, []);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 my-20">
      {loading ? (
        <>
          {[...Array(6)].map((_, index) => (
            <Card
              key={index}
              className="border-2 dark:border-2 w-[85vw] lg:w-[25vw] shadow-sm"
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
              <Card
                href={blog.permalink}
                className="border-2 dark:border-2 w-[85vw] lg:w-[25vw] shadow-sm"
              >
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
                  <CardTitle className="text-md lg:text-lg font-bold text-wrap">
                    {blog.title.slice(0, 50)}...
                  </CardTitle>
                  <CardDescription className="text-sm lg:text-md text-wrap text-muted-foreground">
                    {blog.summary.slice(0, 120)}...
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-3 text-xs md:text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <IoTimeOutline className="text-base " />
                    <span className="font-medium">
                      {new Date(blog.dateCreated).toLocaleDateString("en-US", {
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
            </Link>
          ))}
        </>
      )}
    </section>
  );
};

export default Blogs;
