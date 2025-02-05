import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaEye, FaGithub } from "react-icons/fa";
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

const projects = [
  {
    title: "Project 1",
    description: "This is a description of project 1",
    imageUrl:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    projectLinks: [
      {
        linkType: "GitHub",
        icon: <FaGithub />,
        url: "https://github.com/project1",
      },
      { linkType: "Live", icon: <FaEye />, url: "https://linktoproject1.com" },
      { linkType: "Blog", icon: <RxReader />, url: "https://linktoblog1.com" },
    ],
  },
  {
    title: "Project 2",
    description: "This is a description of project 2",
    imageUrl:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    projectLinks: [
      {
        linkType: "GitHub",
        icon: <FaGithub />,
        url: "https://github.com/project2",
      },
      { linkType: "Live", icon: <FaEye />, url: "https://linktoproject2.com" },
      { linkType: "Blog", icon: <RxReader />, url: "https://linktoblog2.com" },
    ],
  },
  {
    title: "Project 3",
    description: "This is a description of project 3",
    imageUrl:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    projectLinks: [
      {
        linkType: "GitHub",
        icon: <FaGithub />,
        url: "https://github.com/project3",
      },
      { linkType: "Live", icon: <FaEye />, url: "https://linktoproject3.com" },
      { linkType: "Blog", icon: <RxReader />, url: "https://linktoblog3.com" },
    ],
  },
];

const ProjectSection = () => {
  return (
    <section className="w-[85vw] min-h-[80vh] lg:w-[75vw] flex flex-col lg:flex-row justify-center items-center gap-12 mx-auto my-10">
      {/* Left Side - Sticky Content */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center items-center gap-5">
        <h2 className="font-bold lg:font-extrabold text-3xl lg:text-4xl text-center">
          Projects
        </h2>
        <p className="mt-4 text-base lg:text-lg text-center ">
          I build full-stack web applications with React, Next.js, Node.js, and
          other modern technologies. Here are some of my recent projects.
        </p>
        <Link href={"/projects"} className="hidden lg:flex">
          <Button className="mt-4">View all projects</Button>
        </Link>
      </div>

      {/* Right Side - Scrolling Content */}
      <ScrollArea className="w-full lg:w-3/5 whitespace-nowrap">
        <div className="flex min-w-full space-x-3 lg:space-x-5">
          {projects.map((project) => (
            <Card key={project.title} className="border-2 w-[80vw] lg:w-[30vw]">
              <CardHeader>
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                  height={200}
                  width={300}
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-md lg:text-xl font-bold">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm lg:text-lg text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-around gap-3 w-full">
                {project.projectLinks.map((link) => (
                  <Link key={link.linkType} href={link.url} target="_blank">
                    <Button variant="outline" className="px-4">
                      {link.icon}
                      <span className="hidden md:flex"> {link.linkType} </span>
                    </Button>
                  </Link>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Link href={"/projects"} className="lg:hidden">
        <Button>View all projects</Button>
      </Link>
    </section>
  );
};

export default ProjectSection;
