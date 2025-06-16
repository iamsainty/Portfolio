"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function getBlogpost(permalink) {
  try {
    const response = await fetch(`/api/blog/${permalink}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      return data.blog;
    }
    return null;
  } catch (error) {
    console.error("Error fetching blogpost:", error);
    return null;
  }
}

const BlogPost = ({ permalink }) => {
  const [blogpost, setBlogpost] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBlogpost = async () => {
      const blogpost = await getBlogpost(permalink);
      setBlogpost(blogpost);
      setLoading(false);
    };
    fetchBlogpost();
    // eslint-disable-next-line
  }, []);

  if (loading) return null;

  if (!blogpost) return null;
  const blogcontent = JSON.parse(blogpost.content[0]).blocks;

  console.log(blogcontent);

  return (
    <section className="md:w-4/5 lg:w-3/5 container px-6 flex flex-col gap-3">
      {blogcontent.map((block, index) => {
        return (
          <section key={index} aria-label="blog content">
            {block.type === "header" &&
              React.createElement(`h${block.data.level}`, {
                className: `font-bold text-lg md:text-xl lg:text-2xl pt-4 text-justify heading-level-${block.data.level}`,
                dangerouslySetInnerHTML: { __html: block.data.text },
                ariaLabel: "blog content",
              })}

            {block.type === "paragraph" && (
              <div
                className="text-md md:text-lg text-justify"
                aria-label="blog content"
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            )}
            {block.type === "list" &&
              (block.data.style === "ordered" ? (
                <ol className="list-decimal pl-6 space-y-2 my-2">
                  {block.data.items.map((item, index) => (
                    <li
                      key={index}
                      className="text-md lg:text-lg text-justify"
                      aria-label="blog content"
                      dangerouslySetInnerHTML={{
                        __html: item.content ? item.content : item,
                      }}
                    />
                  ))}
                </ol>
              ) : (
                <ul className="list-disc pl-6 space-y-2 my-2">
                  {block.data.items.map((item, index) => (
                    <li
                      key={index}
                      className="text-md lg:text-lg text-justify"
                      dangerouslySetInnerHTML={{
                        __html: item.content ? item.content : item,
                      }}
                      aria-label="blog content"
                    />
                  ))}
                </ul>
              ))}

            {block.type === "code" && (
              <pre className="p-3 rounded-md overflow-x-auto bg-gray-800 text-white border">
                <code className="text-sm text-justify">{block.data.code}</code>
              </pre>
            )}
            {block.type === "quote" && (
              <blockquote className="border-l-4 pl-4 my-4 text-lg border-muted-foreground">
                <p
                  dangerouslySetInnerHTML={{ __html: block.data.text }}
                  className="mb-2 text-muted-foreground text-justify"
                  aria-label="blog content"
                />
                {block.data.caption && (
                  <footer className="text-sm text-muted-foreground italic text-justify">
                    — {block.data.caption}
                  </footer>
                )}
              </blockquote>
            )}
            {block.type === "table" && (
              <Table
                className={`${
                  block.data.stretched ? "w-full" : "w-auto"
                } my-4 border border-muted-foreground rounded-md`}
                aria-label="blog content"
              >
                <TableHeader>
                  {block.data.withHeadings && (
                    <TableRow className="border border-muted-foreground">
                      {block.data.content[0].map((heading, index) => (
                        <TableHead
                          key={index}
                          className="px-4 py-2 border border-muted-foreground"
                          aria-label="blog content"
                        >
                          {heading}
                        </TableHead>
                      ))}
                    </TableRow>
                  )}
                </TableHeader>

                <TableBody>
                  {block.data.content
                    .slice(block.data.withHeadings ? 1 : 0)
                    .map((row, rowIndex) => (
                      <TableRow
                        key={rowIndex}
                        className="border border-muted-foreground"
                      >
                        {row.map((cell, cellIndex) => (
                          <TableCell
                            key={cellIndex}
                            className="px-4 py-2 border border-muted-foreground"
                            aria-label="blog content"
                          >
                            {cell}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
            {block.type === "delimiter" && (
              <hr className="my-6 border border-muted-foreground" />
            )}
            {block.type === "raw" && (
              <pre className="p-3 rounded-md overflow-x-auto bg-muted-foreground text-white border">
                <code className="text-sm text-justify">{block.data.html}</code>
              </pre>
            )}
          </section>
        );
      })}
    </section>
  );
};

export default BlogPost;
