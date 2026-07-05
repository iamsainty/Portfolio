import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BlogHeroVisualization from "./BlogHeroVisualization";

const BlogHeroSection = () => {
  return (
    <section className="container mx-auto lg:max-w-6xl px-6 min-h-[80vh] w-full flex items-center overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-4 lg:gap-10 h w-full items-center justify-center">
        {/* LEFT */}
        <div className="text-center lg:text-left">
          {/* Breadcrumb */}
          <Breadcrumb className="border border-border/60 px-4 py-2 rounded-full mb-6 inline-block">
            <BreadcrumbList className="text-xs md:text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Heading */}
          <div className="flex flex-col justify-center gap-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font tracking-wider">
              Developer Notes
            </h1>

            {/* Description */}
            <p className="text-xs font-medium lg:text-md lg:text-lg text-foreground/70 leading-relaxed max-w-lg">
              A collection of tutorials, project walkthroughs, coding insights,
              developer experiences, and practical lessons from my journey in
              software engineering.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <BlogHeroVisualization />
        </div>
      </div>
    </section>
  );
};

export default BlogHeroSection;
