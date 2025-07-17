"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

async function addProject(formData) {
  const adminToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("adminToken="))
    ?.split("=")[1];
  try {
    const response = await fetch("/api/project/newproject", {
      method: "POST",
      headers: {
        adminToken: adminToken,
      },
      body: formData,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error adding project:", error);
    return {
      success: false,
      message: "Failed to add project. Please try again.",
    };
  }
}

export default function NewProject() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [permalink, setPermalink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [githubRepo, setGithubRepo] = useState("");
  const [projectBlog, setProjectBlog] = useState("");
  const [status, setStatus] = useState("in-progress");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("technologies", technologies);
      formData.append("permalink", permalink);
      formData.append("liveLink", liveLink);
      formData.append("githubRepo", githubRepo);
      formData.append("projectBlog", projectBlog);
      formData.append("status", status);
      formData.append("startDate", startDate ? startDate.toISOString() : "");
      formData.append("endDate", endDate ? endDate.toISOString() : "");

      setIsLoading(true);

      const result = await addProject(formData);

      if (result.success) {
        toast.success("Project added successfully!");
        router.push("/admin/dashboard/project/projects");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="p-8 mx-20 mb-24">
      <h1 className="text-3xl font-bold opacity-90 mb-10">Add a New Project</h1>

      <div className="flex flex-col gap-10">
        {/* Project Image */}
        <div className="flex flex-col gap-2">
          <Label className="text-base">Project Image</Label>
          <div
            className="w-[666px] h-[375px] border-2 bg-muted hover:bg-transparent rounded-lg cursor-pointer flex items-center justify-center"
            onClick={() => document.getElementById("imageInput").click()}
          >
            {image ? (
              <Image
                src={URL.createObjectURL(image)}
                alt="Project"
                className="object-cover w-full h-full rounded-md"
                width={64}
                height={48}
              />
            ) : (
              <span className="text-muted-foreground">
                Click to select an image
              </span>
            )}
          </div>
          <Input
            id="imageInput"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Project Title */}
        <div className="flex flex-col gap-2">
          <Label className="text-base">Project Title</Label>
          <Input
            type="text"
            placeholder="Enter project title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Label className="text-base">Project Description</Label>
          <Textarea
            placeholder="Enter a brief description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Technologies */}
        <div className="flex flex-col gap-2">
          <Label className="text-base">Technologies Used</Label>
          <Input
            type="text"
            placeholder="Eg: React, Node.js, Tailwind"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
          />
        </div>

        {/* Permalink */}
        <div className="flex flex-col gap-2">
          <Label className="text-base">Permalink</Label>
          <Input
            type="text"
            placeholder="e.g., my-awesome-project"
            value={permalink}
            onChange={(e) => setPermalink(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-base">Live Project Link</Label>
          <Input
            type="url"
            placeholder="Enter live project URL"
            value={liveLink}
            onChange={(e) => setLiveLink(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-base">GitHub Repository</Label>
          <Input
            type="url"
            placeholder="Enter GitHub repository URL"
            value={githubRepo}
            onChange={(e) => setGithubRepo(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-base">Project Blog</Label>
          <Input
            type="url"
            placeholder="Enter project blog URL (optional)"
            value={projectBlog}
            onChange={(e) => setProjectBlog(e.target.value)}
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-2">
          <Label className="text-base">Project Status</Label>
          <RadioGroup
            value={status}
            onValueChange={setStatus}
            className="flex gap-6"
          >
            <Label className="flex items-center gap-2 text-base">
              <RadioGroupItem value="completed" />
              Completed
            </Label>
            <Label className="flex items-center gap-2 text-base">
              <RadioGroupItem value="in-progress" />
              In Progress
            </Label>
          </RadioGroup>
        </div>

        {/* Project Date */}
        <div className="flex flex-col gap-2">
          <Label className="text-base">Project Date</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-between w-full">
                  {startDate ? format(startDate, "PPP") : "Start Date"}
                  <CalendarIcon className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-between w-full">
                  {endDate ? format(endDate, "PPP") : "End Date"}
                  <CalendarIcon className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <Button disabled={isLoading} onClick={handleSubmit} className="w-1/4">
            {isLoading ? (
              <>
                <LuLoaderCircle className="w-4 h-4 animate-spin mr-2" />
                Adding project...
              </>
            ) : (
              "Add Project"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
