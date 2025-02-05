import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { FaRegComments } from "react-icons/fa";
import { IoEyeOutline, IoTimeOutline } from "react-icons/io5";

const blogs = [
  {
    title: "Blog 1",
    description:
      "This is a description of blog 1 this can be long enough and also this much long",
    imageUrl:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    blogUrl: "https://linktoblog1.com",
    publishDate: Date.now(),
    views: "19",
    comments: "5",
  },
  {
    title: "Blog 2",
    description: "This is a description of blog 2",
    imageUrl:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    blogUrl: "https://linktoblog2.com",
    publishDate: Date.now(),
    views: "34",
    comments: "3",
  },
  {
    title: "Blog 3",
    description: "This is a description of blog 3",
    imageUrl:
      "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png",
    blogUrl: "https://linktoblog3.com",
    publishDate: Date.now(),
    views: "15",
    comments: "8",
  },
];

const Blogs = () => {
  return (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 my-20">
        {blogs.map((blog) => (
          <Card
            key={blog.title}
            className="border-2 dark:border-2 w-[85vw] lg:w-[25vw] shadow-md"
          >
            <CardHeader>
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-auto object-cover rounded-lg shadow-md"
                height={200}
                width={300}
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-md lg:text-lg font-bold text-wrap">
                {blog.title}
              </CardTitle>
              <CardDescription className=" lg:text-md text-muted-foreground text-wrap">
                {blog.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-3 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <IoTimeOutline className="text-base " />
                <span className="font-medium">
                  {new Date(blog.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IoEyeOutline className="text-base " />
                <span className="font-medium">
                  {blog.views.toLocaleString()} views
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaRegComments className="text-base " />
                <span className="font-medium">
                  {blog.comments.toLocaleString()} comments
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </section>
  );
};

export default Blogs;
