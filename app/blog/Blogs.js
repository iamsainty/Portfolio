"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FiEye, FiMessageCircle, FiClock } from "react-icons/fi";
import { useBlog } from "@/context/blogContext";
import { formatDistanceToNowStrict } from "date-fns";

export default function Blogs() {
  const { blogs, loading, error, pagination, fetchBlogs } = useBlog();

  const loadMoreRef = useRef(null);

  useEffect(() => {
    fetchBlogs(1);
  }, [fetchBlogs]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && pagination?.hasNextPage) {
          fetchBlogs(pagination.currentPage + 1);
        }
      },
      {
        root: null,
        rootMargin: "500px 0px",
        threshold: 0,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loading, pagination, fetchBlogs]);

  if (error) {
    return (
      <section className="container mx-auto lg:max-w-6xl flex flex-col md:flex-row flex-wrap items-center justify-center overflow-hidden gap-8 lg:gap-5 my-20">
        {error}
      </section>
    );
  }

  return (
    <section className="container mx-auto lg:max-w-6xl flex flex-col md:flex-row flex-wrap items-center justify-center overflow-hidden gap-8 lg:gap-5 my-20">
      {blogs.map((blog) => (
        <Link key={blog._id} href={`/blog/${blog.permalink}`}>
          <Card
            key={blog._id}
            className="w-[80vw] md:w-[35vw] lg:w-[25vw] overflow-hidden rounded-2xl border border-muted-foreground/20 shadow-md transition-all duration-300 hover:border-primary/30"
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
              <CardTitle className="text-lg font-normal tracking-wide text-wrap line-clamp-1">
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
                  {formatDistanceToNowStrict(new Date(blog.lastUpdated), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiEye className="text-base " />
                <span>{blog.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMessageCircle className="text-base " />
                <span>{blog.comments.toLocaleString()} comments</span>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
      <div ref={loadMoreRef}></div>
    </section>
  );
}
