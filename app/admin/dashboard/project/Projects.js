"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

async function getProjects() {
  const response = await fetch("/api/project", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data.success ? data.projects : [];
}
export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  if (projects.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex items-start gap-4 border border-muted-foreground/20 p-4 rounded-lg shadow-sm"
          >
            <Skeleton className="w-[20%] h-[100px] rounded-md" />
            <div className="flex-1 space-y-2 w-[70%]">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="flex gap-2 justify-evenly items-center w-[10%]">
              <Skeleton className="w-10 h-10 rounded-md" />
              <Skeleton className="w-10 h-10 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {projects.map((project) => (
        <div
          key={project._id}
          className="flex items-start gap-4 border border-muted-foreground/20 p-4 rounded-lg hover:shadow-sm transition"
        >
          <Image
            src={project.image}
            alt={project.title}
            width={100}
            height={100}
            className="object-cover rounded-md w-[20%]"
          />
          <div className="flex-1 flex flex-col gap-1 w-[70%]">
            <h3 className="text-lg font-semibold line-clamp-1">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>
          <div className="flex gap-2 justify-evenly items-center w-[10%]">
            <Button variant="outline" className="p-2 hover:bg-muted/50">
              <CiEdit className="text-xl" />
            </Button>
            <Button
              variant="outline"
              className="p-2 hover:bg-red-500 hover:text-white transition-colors"
            >
              <AiOutlineDelete className="text-xl" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
