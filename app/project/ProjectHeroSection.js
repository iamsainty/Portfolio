import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProjectHeroVisualization from "./ProjectHeroVisualization";

const ProjectHeroSection = () => {
  return (
    <section className="container mx-auto px-6 py-12 md:py-16 flex items-center min-h-[80vh]">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                <BreadcrumbPage className="font-medium">
                  Projects
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Heading */}
          <div className="flex flex-col justify-center gap-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-tight leading-tight">
              Projects that I Built & Learned From
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              A collection of real-world applications, experiments, and ideas —
              crafted by solving real problems, exploring modern technologies,
              and learning through building.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <ProjectHeroVisualization />
        </div>
      </div>
    </section>
  );
};

export default ProjectHeroSection;
