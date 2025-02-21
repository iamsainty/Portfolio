"use client";

import React, { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Assuming this path is correct
import Image from "next/image";
import { Dot } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useBlog } from "@/context/blogContext";
import BlogNotFound from "./BlogNotFound";
import { Skeleton } from "@/components/ui/skeleton";

const BlogpostHeroSection = ({ permalink }) => {
  const { blogpost, loading, getBlogpost } = useBlog();
  useEffect(() => {
    getBlogpost(permalink);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="px-6 py-10 md:py-14 lg:py-16 flex flex-col justify-evenly items-center gap-10 lg:w-3/5 mx-auto">
        {/* Breadcrumb Skeleton */}
        <div className="border px-4 py-2 rounded-full mb-8 bg-gray-50 dark:bg-gray-800 dark:text-white">
          <div className="flex space-x-2 text-xs md:text-sm">
            <Skeleton className="h-4 w-12" />
            <span>/</span>
            <Skeleton className="h-4 w-12" />
            <span>/</span>
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Blog Title & Author Skeleton */}
        <div className="text-center w-full mx-auto flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
          <Skeleton className="h-10 w-full" /> {/* Title */}
          <div className="flex flex-row items-center justify-center space-x-2 text-sm md:text-base text-muted-foreground">
            <Skeleton className="h-6 w-24" /> {/* Author */}
            <Skeleton className="h-6 w-16" /> {/* Time ago */}
          </div>
        </div>

        {/* Blog Cover Image Skeleton */}
        <Skeleton className="w-full h-[300px] md:h-[450px] lg:h-[600px] rounded-xl" />
      </div>
    );
  }

  if (!blogpost) return <BlogNotFound />;

  // Convert date to "time ago" format
  const timeAgo = formatDistanceToNow(new Date(blogpost.dateCreated), {
    addSuffix: true,
  });

  return (
    <section className="px-6 py-10 md:py-14 lg:py-16 flex flex-col justify-evenly items-center gap-10 lg:w-3/5 mx-auto">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="border px-4 py-2 rounded-full mb-8 bg-gray-50 dark:bg-gray-800 dark:text-white">
        <BreadcrumbList className="text-xs md:text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className=" md:hidden font-semibold">
              {blogpost.title.slice(0, 15)}...
            </BreadcrumbPage>
            <BreadcrumbPage className="hidden md:flex font-semibold">
              {blogpost.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Blog Cover Image and Title */}
      <div className="text-center w-full mx-auto flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          {blogpost.title}
        </h1>
        <div className="flex flex-row items-center justify-center text-sm md:text-base text-muted-foreground">
          <p className="font-medium">{blogpost.author}</p>
          <span className="text-muted-foreground mx-1">
            <Dot />
          </span>
          <p>{timeAgo}</p>
        </div>
      </div>

      {/* Blog Cover Image */}
      <div className="max-w-full h-auto relative rounded-xl overflow-hidden shadow-lg">
        <Image
          src={blogpost.coverimage}
          alt={blogpost.title}
          width={1100}
          height={600}
          className="object-cover object-center"
        />
      </div>
    </section>
  );
};

export default BlogpostHeroSection;
