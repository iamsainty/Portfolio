"use client";

import React, { useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { FiEye, FiMessageCircle, FiClock } from "react-icons/fi";
import { useBlog } from "@/context/blogContext";

const BlogSection = () => {
  const { blogs, loading, fetchBlogs } = useBlog();

  useEffect(() => {
    fetchBlogs(1);
  }, [fetchBlogs]);

  return (
    <section
      className="container mx-auto lg:max-w-6xl px-6 min-h-[90vh] w-full flex items-center overflow-hidden"
      id="blogsection"
    >
      {/* Left Side - Sticky Content */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full items-center justify-center">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4 lg:gap-7 items-center lg:items-start lg:w-1/2">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
            SHARING WHAT I LEARN
          </p>

          <h2 className="text-2xl lg:text-4xl tracking-wider text-foreground">
            Blogs
          </h2>

          <p className="text-xs text-center lg:text-left font-medium lg:text-md lg:text-lg text-foreground/70 leading-relaxed max-w-lg">
            A collection of tutorials, technical insights, and real-world
            experiences from my journey through software engineering, AI, web
            development, and beyond.
          </p>

          <Button
            variant="outline"
            asChild
            className="rounded-full w-full md:w-fit px-6 border-muted-foreground/40 hover:bg-muted"
          >
            <Link href="/blog">View All</Link>
          </Button>
        </div>

        {/* Right Side - Scrolling Content */}
        <div className="relative w-full lg:min-h-[80vh] lg:w-1/2 flex items-center justify-center overflow-hidden">
          <div className="absolute w-[60%] h-[60%] bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-sky-400/20 blur-3xl rounded-full" />
          <div className="absolute w-[40%] h-[40%] bg-gradient-to-br from-indigo-400/30 via-purple-400/20 to-cyan-400/20 blur-2xl rounded-full" />
          <ScrollArea className="w-full whitespace-nowrap rounded-lg py-4">
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
                      <Card
                        key={blog._id}
                        className="w-[80vw] md:w-[40vw] lg:w-[27.5vw] overflow-hidden rounded-2xl border border-muted-foreground/20 shadow-md transition-all duration-300 hover:border-primary/30"
                      >
                        <CardHeader>
                          <div className="overflow-hidden">
                            <Image
                              src={blog.coverimage}
                              alt={blog.title}
                              width={500}
                              height={300}
                              className="h-auto w-full rounded-lg object-cover transition-transform duration-500"
                            />
                          </div>
                        </CardHeader>

                        <CardContent className="flex flex-col gap-4 p-5">
                          <CardTitle className="text-xl font-normal tracking-wide text-wrap line-clamp-1">
                            {blog.title}
                          </CardTitle>

                          <CardDescription className="text-xs md:text-sm text-wrap leading-relaxed text-muted-foreground line-clamp-2">
                            {blog.summary}
                          </CardDescription>

                          <div className="flex flex-wrap gap-2">
                            {blog.tag.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-light text-primary"
                              >
                                {tag}
                              </span>
                            ))}

                            {blog.tag.length > 2 && (
                              <span className="px-2 py-1 text-xs text-muted-foreground">
                                +{blog.tag.length - 2} more
                              </span>
                            )}
                          </div>
                        </CardContent>

                        <CardFooter className="flex flex-col items-start gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <FiClock className="text-base" />
                            <span>
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
                            <FiEye className="text-base " />
                            <span>{blog.views.toLocaleString()} views</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiMessageCircle className="text-base " />
                            <span>
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
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
