import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import EmailNewsletter from "@/components/EmailNewsletter";

const BlogHeroSection = () => {
  return (
    <section className="px-6 py-10 md:py-10 lg:py-12 flex flex-col items-center justify-evenly min-h-[85vh]">
      <Breadcrumb className="border-2 px-4 py-2 rounded-full mb-8">
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
      <div className="text-center mb-10 mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold lg:font-extrabold">
          Explore the Blog: Tech Stories, Guides, and More
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Discover tech tutorials, lifestyle inspiration, and stories.
        </p>
      </div>
      <EmailNewsletter />
    </section>
  );
};

export default BlogHeroSection;
