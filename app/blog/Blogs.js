import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegComments } from "react-icons/fa";
import { IoEyeOutline, IoTimeOutline } from "react-icons/io5";

const Blogs = ({ blogs }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 my-20">
      {blogs &&
        blogs.map((blog) => (
          <Link key={blog._id} href={`/blog/${blog.permalink}`}>
            <Card
              href={blog.permalink}
              className="border-2 dark:border-2 w-[85vw] lg:w-[25vw] shadow-sm"
            >
              <CardHeader>
                <Image
                  src={blog.coverimage}
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
                  {blog.summary}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-3 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <IoTimeOutline className="text-base " />
                  <span className="font-medium">
                    {new Date(blog.dateCreated).toLocaleDateString("en-US", {
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
          </Link>
        ))}
    </section>
  );
};

export default Blogs;
