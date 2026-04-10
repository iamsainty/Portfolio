import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FiCode, FiLayers, FiTrendingUp } from "react-icons/fi";
import BlogHeroVisualization from "./BlogHeroVisualization";

const BlogHeroSection = () => {
  return (
    <section className="px-6 py-10 md:py-10 lg:py-12 flex flex-col items-center justify-evenly min-h-[85vh]">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">
          <Breadcrumb className="border px-4 py-2 rounded-full mb-6 inline-block">
            <BreadcrumbList className="text-xs md:text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold">Blog</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            Engineering Insights & Developer Thinking
          </h1>

          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
            Deep dives into real-world systems, scalable architecture, and
            practical coding experiences — built from actual projects, not
            theory.
          </p>

          {/* subtle feature points */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <FiCode className="text-base" />
              <span>Production Code</span>
            </div>
            <div className="flex items-center gap-2">
              <FiLayers className="text-base" />
              <span>System Design</span>
            </div>
            <div className="flex items-center gap-2">
              <FiTrendingUp className="text-base" />
              <span>Growth & Learnings</span>
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL - DENSE INTERACTIVE */}
        <div className="lg:col-span-1">
          <BlogHeroVisualization />
        </div>
      </div>
    </section>
  );
};

export default BlogHeroSection;
