"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaEye, FaGithub, FaRegCalendarPlus } from "react-icons/fa";
import {
  FiCalendar,
  FiArrowUpRight,
  FiGithub,
  FiBookOpen,
} from "react-icons/fi";
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
import { useProject } from "@/context/projectContext";
import { Skeleton } from "@/components/ui/skeleton";

const formatDate = (dateString) => {
  if (!dateString) return "Ongoing";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const ProjectSection = () => {
  const { getProjects, projects, loading } = useProject();

  useEffect(() => {
    getProjects();
    // eslint-disable-next-line
  }, []);

  return (
    <section
      className="container mx-auto lg:max-w-6xl px-6 h-[100vh] w-full flex items-center overflow-hidden"
      id="projectsection"
    >
      {/* Left Side - Sticky Content */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full items-center justify-center">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4 lg:gap-7 items-center lg:items-start lg:w-1/2">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
            CRAFTED WITH CODE
          </p>

          <h2 className="font-thin text-2xl lg:text-4xl tracking-wider text-foreground">
            PROJECTS
          </h2>

          <p className="text-xs text-center lg:text-left font-medium lg:text-md lg:text-lg text-foreground/70 leading-relaxed max-w-lg">
            I enjoy turning ideas into real applications. These projects
            showcase my work across web development, AI, and software
            engineering.
          </p>

          <Button
            variant="outline"
            asChild
            className="rounded-full w-full md:w-fit px-6 border-muted-foreground/40 hover:bg-muted"
          >
            <Link href="/project">View All</Link>
          </Button>
        </div>

        {/* Right Side - Scrolling Content */}
        <div className="relative w-full lg:min-h-[80vh] lg:w-1/2 flex items-center justify-center overflow-hidden">
          <div className="absolute w-[60%] h-[60%] bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-sky-400/20 blur-3xl rounded-full" />
          <div className="absolute w-[40%] h-[40%] bg-gradient-to-br from-indigo-400/30 via-purple-400/20 to-cyan-400/20 blur-2xl rounded-full" />
          <ScrollArea className="w-full whitespace-nowrap rounded-lg py-4">
            <div className="flex w-full space-x-3 lg:space-x-5">
              {loading ? (
                <>
                  {[...Array(5)].map((_, index) => (
                    <Card
                      key={index}
                      className="w-[80vw] md:w-[40vw] lg:w-[27.5vw] overflow-hidden rounded-2xl border border-muted-foreground/20"
                    >
                      <CardHeader className="p-0">
                        <Skeleton className="h-48 w-full rounded-none" />
                      </CardHeader>

                      <CardContent className="flex flex-col gap-4 p-5">
                        <div className="flex flex-col gap-2">
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          <Skeleton className="h-7 w-20 rounded-full" />
                          <Skeleton className="h-7 w-24 rounded-full" />
                          <Skeleton className="h-6 w-16" />
                        </div>

                        {/* Duration */}
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded-full" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </CardContent>

                      <CardFooter className="flex flex-row gap-2 px-5 py-4">
                        <Skeleton className="h-10 w-14 rounded-full" />
                        <Skeleton className="h-10 w-20 rounded-full" />
                        <Skeleton className="h-10 w-16 rounded-full" />
                      </CardFooter>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  {projects.map((project) => (
                    <Card
                      key={project._id}
                      className="w-[80vw] md:w-[40vw] lg:w-[27.5vw] overflow-hidden rounded-2xl border border-muted-foreground/20 shadow-md transition-all duration-300 hover:border-primary/30"
                    >
                      <CardHeader>
                        <div className="overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={500}
                            height={300}
                            className="h-48 w-full object-cover transition-transform duration-500"
                          />
                        </div>
                      </CardHeader>

                      <CardContent className="flex flex-col gap-4 p-5">
                        <div className="flex flex-col gap-2">
                          <CardTitle className="text-xl font-light tracking-wide line-clamp-1">
                            {project.title}
                          </CardTitle>

                          <CardDescription className="text-xs md:text-sm text-wrap leading-relaxed text-muted-foreground line-clamp-2">
                            {project.description}
                          </CardDescription>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {project.technologies
                            .slice(0, 2)
                            .map((tech, index) => (
                              <span
                                key={index}
                                className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-light text-primary"
                              >
                                {tech}
                              </span>
                            ))}

                          {project.technologies.length > 2 && (
                            <span className="px-2 py-1 text-xs text-muted-foreground">
                              +{project.technologies.length - 2} more
                            </span>
                          )}
                        </div>

                        {/* Duration */}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <FiCalendar className="text-sm" />
                          <span>
                            {formatDate(project.startDate)} —{" "}
                            {formatDate(project.endDate)}
                          </span>
                        </div>
                      </CardContent>

                      <CardFooter className="flex flex-row gap-2 px-5 py-4">
                        {project.liveLink && (
                          <Link
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={project.liveLink}
                            className="group"
                          >
                            <Button
                              variant="outline"
                              className="flex items-center justify-center px-3 rounded-full overflow-hidden transition-all duration-300 ease-out border-muted-foreground/50"
                            >
                              {/* Icon */}
                              <span className="text-xl flex-shrink-0 transform transition-all duration-300 group-hover:-translate-x-1 pl-2 group-hover:pl-0 group-hover:rotate-12">
                                <FiArrowUpRight />
                              </span>

                              {/* Text */}
                              <span className="max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 transition-all duration-300 ease-out whitespace-nowrap overflow-hidden">
                                Live
                              </span>
                            </Button>
                          </Link>
                        )}

                        {project.githubRepo && (
                          <Link
                            href={project.githubRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={project.githubRepo}
                            className="group"
                          >
                            <Button
                              variant="outline"
                              className="flex items-center justify-center px-3 rounded-full overflow-hidden transition-all duration-300 ease-out hover:bg-muted border border-muted-foreground/50"
                            >
                              {/* Icon */}
                              <span className="text-xl flex-shrink-0 transform transition-all duration-300 group-hover:-translate-x-1 pl-1 group-hover:pl-0 group-hover:rotate-12">
                                <FiGithub />
                              </span>

                              {/* Text */}
                              <span className="max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 transition-all duration-300 ease-out whitespace-nowrap overflow-hidden">
                                Github
                              </span>
                            </Button>
                          </Link>
                        )}

                        {project.projectBlog && (
                          <Link
                            href={project.projectBlog}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={project.projectBlog}
                            className="group"
                          >
                            <Button
                              variant="outline"
                              className="flex items-center justify-center px-3 rounded-full overflow-hidden transition-all duration-300 ease-out hover:bg-muted border border-muted-foreground/50"
                            >
                              {/* Icon */}
                              <span className="text-xl flex-shrink-0 transform transition-all duration-300 group-hover:-translate-x-1 pl-1 group-hover:pl-0 group-hover:rotate-12">
                                <FiBookOpen />
                              </span>

                              {/* Text */}
                              <span className="max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 transition-all duration-300 ease-out whitespace-nowrap overflow-hidden">
                                Blog
                              </span>
                            </Button>
                          </Link>
                        )}
                      </CardFooter>
                    </Card>
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

export default ProjectSection;
