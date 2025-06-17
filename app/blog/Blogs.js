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

export default function Blogs({ blogs }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 my-20">
      {blogs.map((blog) => (
        <article key={blog._id}>
          <Link
            href={`/blog/${blog.permalink}`}
            aria-label={`Read more about ${blog.title}`}
          >
            <Card className="border-2 dark:border-2 w-[85vw] lg:w-[25vw] shadow-sm">
              <CardHeader>
                <Image
                  src={blog.coverimage}
                  alt={blog.title}
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                  height={200}
                  width={300}
                  loading="lazy"
                />
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle className="text-md lg:text-lg font-bold text-wrap line-clamp-2">
                  {blog.title}
                </CardTitle>
                <CardDescription className="text-sm lg:text-md text-wrap text-muted-foreground line-clamp-2">
                  {blog.summary}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-3 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <IoTimeOutline className="text-base " aria-label="Date" />
                  <span className="font-medium">
                    {new Date(blog.dateCreated).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <IoEyeOutline className="text-base " aria-label="Views" />
                  <span className="font-medium">
                    {blog.views.toLocaleString()} views
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegComments className="text-base " aria-label="Comments" />
                  <span className="font-medium">
                    {blog.comments.toLocaleString()} comments
                  </span>
                </div>
              </CardFooter>
            </Card>
          </Link>
        </article>
      ))}
    </section>
  );
}
