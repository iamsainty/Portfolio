"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaEye, FaGithub, FaRegCalendarPlus } from "react-icons/fa";
import { RxReader } from "react-icons/rx";
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
    <section className="sticky top-[5vh] lg:top-[10vh] w-[85vw] min-h-[90vh] lg:w-[75vw] flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-12 mx-auto mb-[5vh] bg-white dark:bg-black">
      {/* Left Side - Sticky Content */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center items-center gap-5">
        <h2 className="font-bold lg:font-extrabold text-3xl lg:text-4xl text-center">
          Projects
        </h2>
        <p className="mt-4 text-base lg:text-lg text-center ">
          I build full-stack web applications with React, Next.js, Node.js, and
          other modern technologies. Here are some of my recent projects.
        </p>
        <Link href={"/project"} className="hidden lg:flex">
          <Button className="mt-4">View all projects</Button>
        </Link>
      </div>

      {/* Right Side - Scrolling Content */}
      <ScrollArea className="w-full lg:w-3/5 whitespace-nowrap rounded-0 py-4">
        <div className="flex min-w-full space-x-3 lg:space-x-5">
          {loading ? (
            <>
              {[...Array(5)].map((_, index) => (
                <Card
                  key={index}
                  className=" border-2 w-[80vw] lg:w-[30vw] flex flex-col gap-4"
                >
                  <CardHeader>
                    <Skeleton className="w-full h-36 lg:h-48" />
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <CardTitle className="text-lg lg:text-2xl font-bold">
                      <Skeleton className="w-4/5 h-6" />
                    </CardTitle>
                    <CardDescription className="text-sm lg:text-md text-wrap text-muted-foreground">
                      <Skeleton className="w-full h-12" />
                      <div className="flex gap-2 mt-4">
                        <Skeleton className="w-1/5 h-6" />
                        <Skeleton className="w-1/5 h-6" />
                      </div>
                    </CardDescription>
                    <Skeleton className="w-3/5 h-4" />
                  </CardContent>
                  <CardFooter className="flex justify-around w-full gap-2">
                    <Skeleton className="w-3/4 h-8" />
                    <Skeleton className="w-3/4 h-8" />
                    <Skeleton className="w-3/4 h-8" />
                  </CardFooter>
                </Card>
              ))}
            </>
          ) : (
            <>
              {projects.map((project) => (
                <Card
                  key={project._id}
                  className=" border-2 w-[80vw] lg:w-[30vw] flex flex-col gap-4"
                >
                  <CardHeader>
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-cover"
                      height={125}
                      width={222}
                    />
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <CardTitle className="text-lg lg:text-2xl font-bold">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm lg:text-md text-wrap text-muted-foreground">
                      {project.description.slice(0, 100)}...
                    </CardDescription>

                    <div className="flex items-center gap-2 my-2 flex-wrap">
                      {project.technologies.slice(0, 2).map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs font-medium border bg-muted rounded-full"
                        >
                          {tech}
                        </span>
                      ))}

                      {project.technologies.length > 2 && (
                        <span className="px-3 py-1 text-xs font-medium text-muted-foreground cursor-pointer">
                          +{project.technologies.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Displaying Project Status */}
                    <div className="flex items-center gap-2">
                      <FaRegCalendarPlus className="text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        <strong> Duration : </strong>{" "}
                        {formatDate(project.startDate)} -{" "}
                        {formatDate(project.endDate)}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-around w-full">
                    {project.liveLink && (
                      <Link href={project.liveLink} target="_blank">
                        <Button variant="outline" className="px-4">
                          <FaEye />
                          <span className=" md:flex"> Live </span>
                        </Button>
                      </Link>
                    )}
                    {project.githubRepo && (
                      <Link href={project.githubRepo} target="_blank">
                        <Button variant="outline" className="px-4">
                          <FaGithub />
                          <span className=" md:flex"> Github </span>
                        </Button>
                      </Link>
                    )}
                    {project.projectBlog && (
                      <Link href={project.projectBlog} target="_blank">
                        <Button variant="outline" className="px-4">
                          <RxReader />
                          <span className=" md:flex"> Blog </span>
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

      {/* Mobile View Link to View All Projects */}
      <Link href={"/projects"} className="lg:hidden">
        <Button>View all projects</Button>
      </Link>
    </section>
  );
};

export default ProjectSection;
