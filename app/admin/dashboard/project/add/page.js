"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";

export default function Page() {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      title,
      description,
      technologies,
      permalink,
      liveLink,
      githubRepo,
      projectBlog,
      startDate,
      endDate,
      status,
      image
    };

    // Handle the project data (e.g., send it to an API, save to a database, etc.)
    console.log("Project Data:", projectData);
  };

  return (
    <section className="p-8 mx-20 mb-24">
      <h2 className="text-5xl font-extrabold opacity-90 mb-8">Add a new project</h2>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* File Upload */}
        <label className="text-xl font-medium">Project Image</label>
        <div
          className="w-[666px] h-[375px] border-2 bg-muted hover:bg-transparent rounded-lg cursor-pointer flex items-center justify-center"
          onClick={() => document.getElementById("imageInput").click()}
        >
          {image ? (
            <Image
              src={image}
              alt="Project"
              className="object-cover w-full h-full rounded-md"
              width={64}
              height={48}
            />
          ) : (
            <span className="text-muted-foreground">Click to select an image</span>
          )}
        </div>
        <Input
          id="imageInput"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />

        {/* Project Title */}
        <Label className="text-xl font-medium">Project Title</Label>
        <Input
          type="text"
          placeholder="Enter project title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Short Description */}
        <Label className="text-xl font-medium">Short Description</Label>
        <Textarea
          placeholder="Enter a brief description..."
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Technologies */}
        <Label className="text-xl font-medium">Technologies</Label>
        <Input
          type="text"
          placeholder="e.g., React, Node.js, Tailwind"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
        />

        {/* Permalink */}
        <Label className="text-xl font-medium">Permalink</Label>
        <Input
          type="text"
          placeholder="e.g., my-awesome-project"
          value={permalink}
          onChange={(e) => setPermalink(e.target.value)}
        />

        {/* Project Links */}
        <Label className="text-xl font-medium">Live Project Link</Label>
        <Input
          type="url"
          placeholder="Enter live project URL"
          value={liveLink}
          onChange={(e) => setLiveLink(e.target.value)}
        />

        <Label className="text-xl font-medium">GitHub Repository</Label>
        <Input
          type="url"
          placeholder="Enter GitHub repository URL"
          value={githubRepo}
          onChange={(e) => setGithubRepo(e.target.value)}
        />

        <Label className="text-xl font-medium">Project Blog</Label>
        <Input
          type="url"
          placeholder="Enter project blog URL (optional)"
          value={projectBlog}
          onChange={(e) => setProjectBlog(e.target.value)}
        />

        {/* Start and End Date */}
        <div>
          <Label className="text-xl font-medium">Project date</Label>
          <div className="flex gap-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full flex justify-between">
                  {startDate ? format(startDate, "PPP") : "Start Date"}
                  <CalendarIcon className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full flex justify-between">
                  {endDate ? format(endDate, "PPP") : "End Date"}
                  <CalendarIcon className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Status Selection */}
        <Label className="text-xl font-medium">Project Status</Label>
        <RadioGroup
          value={status}
          onValueChange={setStatus}
          className="flex gap-6"
        >
          <Label className="flex items-center gap-2 text-lg">
            <RadioGroupItem value="completed" />
            Completed
          </Label>
          <Label className="flex items-center gap-2 text-lg">
            <RadioGroupItem value="in-progress" />
            In Progress
          </Label>
        </RadioGroup>

        {/* Submit Button */}
        <Button className="mt-4 w-full text-lg" type="submit">Add Project</Button>
      </form>
    </section>
  );
}
