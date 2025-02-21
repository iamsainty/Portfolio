"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBlog } from "@/context/blogContext";

const BlogPost = ({ permalink }) => {
  const { blogpost, loading, getBlogpost } = useBlog();
  useEffect(() => {
    getBlogpost(permalink);
    // eslint-disable-next-line
  }, []);

  if (loading) return null;

  if (!blogpost) return null;
  const blogcontent = JSON.parse(blogpost.content[0]).blocks;
  return (
    <section className="md:w-4/5 lg:w-3/5 container px-6 flex flex-col gap-3">
      {blogcontent.map((block, index) => {
        return (
          <section key={index}>
            {block.type === "header" &&
              React.createElement(
                `h${block.data.level}`,
                {
                  className: `font-bold text-lg md:text-xl lg:text-2xl pt-4 heading-level-${block.data.level}`,
                },
                block.data.text
              )}

            {block.type === "paragraph" && (
              <div
                className="text-md md:text-lg"
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            )}
            {block.type === "list" &&
              (block.data.style === "ordered" ? (
                <ol className="list-decimal pl-6 space-y-2 my-2">
                  {block.data.items.map((item, index) => (
                    <li
                      key={index}
                      className="text-md lg:text-lg"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
                </ol>
              ) : (
                <ul className="list-disc pl-6 space-y-2 my-2">
                  {block.data.items.map((item, index) => (
                    <li
                      key={index}
                      className="text-md lg:text-lg"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
                </ul>
              ))}

            {block.type === "code" && (
              <pre className="p-3 rounded-md overflow-x-auto bg-gray-800 text-white border">
                <code className="text-sm ">{block.data.code}</code>
              </pre>
            )}
            {block.type === "quote" && (
              <blockquote className="border-l-4 pl-4 my-4  text-lg border-gray-500">
                <p
                  dangerouslySetInnerHTML={{ __html: block.data.text }}
                  className="mb-2 text-muted-foreground"
                />
                {block.data.caption && (
                  <footer className="text-sm text-muted-foreground italic">
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
              >
                <TableHeader>
                  {block.data.withHeadings && (
                    <TableRow className="border border-muted-foreground">
                      {block.data.content[0].map((heading, index) => (
                        <TableHead
                          key={index}
                          className="px-4 py-2 border border-muted-foreground"
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
              <pre className="p-3 rounded-md overflow-x-auto bg-gray-800 text-white border">
                <code className="text-sm">{block.data.html}</code>
              </pre>
            )}
          </section>
        );
      })}
    </section>
  );
};

export default BlogPost;
