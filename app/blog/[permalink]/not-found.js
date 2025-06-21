import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const BlogNotFound = () => {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-2xl lg:text-4xl font-bold mb-6">
        Oops! Blog Not Found
      </h1>
      <p className="text-lg lg:text-xl  mb-2">
        The blog you are looking for does not exist or has been removed.
      </p>
      <p className="text-lg lg:text-xl mb-6">
        Don&apos;t worry, there are many other great blogs that might catch your
        interest!
      </p>
      <Link href={"/blog"}>
        <Button className="font-bold">Explore blogs</Button>
      </Link>
    </div>
  );
};

export default BlogNotFound;
