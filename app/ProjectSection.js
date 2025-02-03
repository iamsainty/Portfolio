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
  {
    title: "Project 4",
    description: "This is a description of project 4",
    imageUrl:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    projectLinks: [
      {
        linkType: "GitHub",
        icon: <FaGithub />,
        url: "https://github.com/project4",
      },
      { linkType: "Live", icon: <FaEye />, url: "https://linktoproject4.com" },
      { linkType: "Blog", icon: <RxReader />, url: "https://linktoblog4.com" },
    ],
  },
];

const ProjectSection = () => {
  return (
    <section className="w-[85vw] lg:w-[75vw] flex flex-col lg:flex-row justify-between gap-16 mx-auto">
      {/* Left Side - Sticky Content */}
      <div className="lg:h-[75vh] w-full lg:w-5/12 flex flex-col justify-center items-center lg:sticky top-24 gap-5">
        <h2 className="font-bold lg:font-extrabold text-2xl sm:text-3xl lg:text-4xl">
          Projects
        </h2>
        <p className="mt-4 text-lg text-center">
          I can build full stack web apps using React, Next.js, and other
          technologies. Here are some of my projects.
        </p>
        <Link href={"/projects"}>
          <Button className="mt-4">View all projects</Button>
        </Link>
      </div>

      {/* Right Side - Scrolling Content */}
      <div className="w-full flex flex-col items-center lg:w-7/12 gap-10 lg:px-10 overflow-auto">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="border w-full border-black dark:border-white"
          >
            <CardHeader>
              <CardTitle className="text-md lg:text-xl font-bold">
                {project.title}
              </CardTitle>
              <CardDescription className="text-sm lg:text-lg text-muted-foreground">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-auto object-cover rounded-lg shadow-md"
                height={200}
                width={300}
              />
            </CardContent>
            {/* <CardFooter className="flex gap-3 mt-2">
              {project.projectLinks.map((link) => (
                <Link key={link.linkType} href={link.url} target="_blank">
                  <Button variant="outline" className="rounded-lg px-4 py-2">
                    {link.icon} {link.linkType}
                  </Button>
                </Link>
              ))}
            </CardFooter> */}
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
