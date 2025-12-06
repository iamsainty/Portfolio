import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const BlogPost = ({ blogpost }) => {
  const blogcontent = JSON.parse(blogpost.content[0]).blocks;

  console.log("blogcontent", blogcontent);

  const isValidHTML = (html) =>
    typeof html === "string" && html.trim().length > 0;

  return (
    <section className="md:w-4/5 lg:w-3/5 container px-6 flex flex-col gap-3">
      {blogcontent.map((block, index) => (
        <section key={index}>
          {block.type === "header" &&
            React.createElement(`h${block.data.level}`, {
              className: `font-bold text-lg md:text-xl lg:text-2xl pt-4 text-justify heading-level-${block.data.level}`,
              dangerouslySetInnerHTML: isValidHTML(block.data.text)
                ? { __html: block.data.text }
                : undefined,
            })}
          {block.type === "paragraph" && isValidHTML(block.data.text) && (
            <div
              className="text-md md:text-lg text-justify [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: block.data.text }}
            />
          )}

          {block.type === "list" &&
            (block.data.style === "ordered" ? (
              <ol className="list-decimal pl-6 space-y-2 my-2 text-justify">
                {block.data.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-md lg:text-lg text-justify"
                    dangerouslySetInnerHTML={
                      isValidHTML(item)
                        ? { __html: item }
                        : isValidHTML(item.content)
                        ? { __html: item.content }
                        : undefined
                    }
                  />
                ))}
              </ol>
            ) : (
              <ul className="list-disc pl-6 space-y-2 my-2 text-justify">
                {block.data.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-md lg:text-lg text-justify"
                    dangerouslySetInnerHTML={
                      isValidHTML(item)
                        ? { __html: item }
                        : isValidHTML(item.content)
                        ? { __html: item.content }
                        : undefined
                    }
                  />
                ))}
              </ul>
            ))}

          {block.type === "code" && (
            <pre className="p-3 rounded-md overflow-x-auto bg-gray-800 text-white border">
              <code className="text-sm whitespace-pre-wrap">
                {block.data.code}
              </code>
            </pre>
          )}

          {block.type === "quote" && (
            <blockquote className="border-l-4 pl-4 my-4 text-lg border-gray-500 text-justify">
              <p
                className="mb-2 text-muted-foreground"
                dangerouslySetInnerHTML={
                  isValidHTML(block.data.text)
                    ? { __html: block.data.text }
                    : undefined
                }
              />
              {block.data.caption && (
                <footer className="text-sm text-muted-foreground italic">
                  — {block.data.caption}
                </footer>
              )}
            </blockquote>
          )}

          {block.type === "table" && Array.isArray(block.data.content) && (
            <Table
              className={`${
                block.data.stretched ? "w-full" : "w-auto"
              } my-4 border border-muted-foreground rounded-md text-justify`}
            >
              <TableHeader>
                {block.data.withHeadings && (
                  <TableRow className="border border-muted-foreground">
                    {block.data.content[0].map((heading, i) => (
                      <TableHead
                        key={i}
                        className="px-4 py-2 border border-muted-foreground text-justify"
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
                      className="border border-muted-foreground text-justify"
                    >
                      {row.map((cell, cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          className="px-4 py-2 border border-muted-foreground text-justify"
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}

          {block.type === "linkTool" &&
            block.data?.meta &&
            block.data.meta?.title && (
              <a
                href={block.data.meta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted transition text-justify"
              >
                <Image
                  src={`https://www.google.com/s2/favicons?sz=64&domain_url=${block.data.meta.url}`}
                  alt="favicon"
                  className="w-12 h-12"
                  width={50}
                  height={50}
                  loading="lazy"
                />
                <div>
                  <div className="font-semibold text-base line-clamp-1 text-justify">
                    {block.data.meta.title}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 text-justify">
                    {block.data.meta.description}
                  </p>
                </div>
              </a>
            )}

          {block.type === "delimiter" && (
            <hr className="my-6 border border-muted-foreground" />
          )}

          {block.type === "raw" && (
            <pre className="p-3 rounded-md overflow-x-auto bg-gray-800 text-white border">
              <code className="text-sm">{block.data?.html}</code>
            </pre>
          )}
        </section>
      ))}
    </section>
  );
};

export default BlogPost;
