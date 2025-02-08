import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ProjectHeroSection = () => {
  return (
    <section className="px-6 py-10 md:py-14 lg:py-16 flex flex-col items-center justify-evenly min-h-[60vh]">
      <Breadcrumb className="border-2 px-4 py-2 rounded-full mb-8">
        <BreadcrumbList className="text-xs md:text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Project</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="text-center mb-10 mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold lg:font-extrabold">
          Discover Projects: Innovations, Challenges, and Solutions
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Explore a collection of my work, featuring web apps, tools, and
          creative solutions.
        </p>
      </div>
    </section>
  );
};

export default ProjectHeroSection;
