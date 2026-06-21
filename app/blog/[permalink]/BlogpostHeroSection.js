import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { Dot } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const BlogpostHeroSection = ({ blogpost }) => {
  const timeAgo = formatDistanceToNow(new Date(blogpost.dateCreated), {
    addSuffix: true,
  });

  return (
    <section className="px-6 py-10 md:py-14 lg:py-16 flex flex-col justify-evenly items-center gap-10 lg:w-3/5 mx-auto">
      <Breadcrumb className="font-normal border px-4 py-2 rounded-full mb-8 bg-gray-50 dark:bg-gray-800 dark:text-white">
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
            <BreadcrumbPage className=" md:hidden">
              {blogpost.title.slice(0, 15)}...
            </BreadcrumbPage>
            <BreadcrumbPage className="hidden md:flex">
              {blogpost.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article className="text-center w-full mx-auto flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
        <header className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">
            {blogpost.title}
          </h1>
          <div className="flex flex-row items-center justify-center text-sm md:text-base text-muted-foreground">
            <p className="font-light">{blogpost.author}</p>
            <span className="text-muted-foreground mx-1">
              <Dot />
            </span>
            <p className="font-light">
              {timeAgo.charAt(0).toUpperCase() + timeAgo.slice(1)}
            </p>
          </div>
        </header>
      </article>

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
