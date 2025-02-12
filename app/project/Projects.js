"use client";

import { useProject } from "@/context/projectContext";
import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RxReader } from "react-icons/rx";
import { FaEye, FaGithub, FaRegCalendarPlus } from "react-icons/fa";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const formatDate = (dateString) => {
  if (!dateString) return "Ongoing";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const Projects = () => {
  const { getProjects, projects, loading } = useProject();

  useEffect(() => {
    getProjects();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="flex flex-col items-center justify-center max-w-[85vw] mx-auto">
      {loading ? (
        <>
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-full flex flex-col lg:flex-row mx-auto items-center my-20"
            >
              {/* Skeleton for Project Image Section */}
              <div className="w-full lg:w-1/2 flex items-center justify-center">
                <Skeleton className="p-4 lg:p-8 object-cover w-3/5 h-[250px] rounded-2xl" />
              </div>

              {/* Skeleton for Project Details Section */}
              <div className="max-w-full lg:w-1/2 flex flex-col items-center justify-center text-center gap-2">
                <Skeleton className="h-10 w-2/4 mb-6" /> {/* Title */}
                <Skeleton className="h-4 w-5/6" /> {/* Description */}
                <Skeleton className="h-4 w-4/6" />
                {/* Technologies List */}
                <div className="flex flex-wrap justify-center gap-2 my-6">
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton key={index} className="h-8 w-16 rounded-full" />
                    ))}
                </div>
                {/* Duration Section */}
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-40" />
                </div>
                {/* Links Section */}
                <div className="flex gap-2">
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-10 w-24 rounded-full"
                      />
                    ))}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {projects.map((project) => (
            <div
              key={project._id}
              className="w-full flex flex-col lg:flex-row mx-auto items-center my-20"
            >
              {/* Project Image Section */}
              <div className="w-full lg:w-1/2">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="p-4 lg:p-8 object-cover w-full"
                />
              </div>

              {/* Project Details Section */}
              <div className="max-w-full lg:w-1/2 flex flex-col items-center justify-center text-center gap-8">
                <h2 className="text-3xl font-bold">{project.title}</h2>
                <p>{project.description}</p>

                {/* Technologies List */}
                <div className="flex flex-wrap justify-center gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium border rounded-full bg-muted hover:bg-transparent cursor-pointer"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Duration Section */}
                <div className="flex items-center gap-2">
                  <FaRegCalendarPlus className="text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    <strong>Duration : </strong> {formatDate(project.startDate)}{" "}
                    - {formatDate(project.endDate)}
                  </p>
                </div>

                {/* Links Section */}
                <div className="flex gap-2">
                  {project.liveLink && (
                    <Link href={project.liveLink} target="_blank">
                      <Button variant="outline" className="px-5 rounded-full">
                        <FaEye />
                        <span>Live</span>
                      </Button>
                    </Link>
                  )}
                  {project.githubRepo && (
                    <Link href={project.githubRepo} target="_blank">
                      <Button variant="outline" className="px-5 rounded-full">
                        <FaGithub />
                        <span>Github</span>
                      </Button>
                    </Link>
                  )}
                  {project.projectBlog && (
                    <Link href={project.projectBlog} target="_blank">
                      <Button variant="outline" className="px-5 rounded-full">
                        <RxReader />
                        <span>Blog</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default Projects;
