import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BlogHeroSection = () => {
  return (
    <section className="px-6 py-10 md:py-14 lg:py-16 flex flex-col items-center justify-evenly min-h-[85vh]">
      <Breadcrumb className="border-2 px-4 py-2 rounded-full mb-8">
        <BreadcrumbList className="text-xs md:text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Blog</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="text-center mb-10 mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold lg:font-extrabold">
          Explore the Blog: Tech Stories, Guides, and More
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Discover tech tutorials, lifestyle inspiration, and stories.
        </p>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg lg:text-xl font-semibold">
            Email Newsletter
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Subscribe to email newsletter to get the latest updates straight to
            your inbox.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row lg:gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full border-2 py-3 px-5 text-base"
          />
          <Button
            type="submit"
            className="w-full md:w-auto px-6 py-3 mt-4  md:mt-0 text-base font-semibold"
          >
            Subscribe
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default BlogHeroSection;
