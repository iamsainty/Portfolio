import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export default function PageContent({ page }) {
  const content = JSON.parse(page.content[0]).blocks;

  const isValidHTML = (html) =>
    typeof html === "string" && html.trim().length > 0;

  return (
    <section className="md:w-4/5 lg:w-3/5 container px-6 flex flex-col gap-3">
      <article className="w-full mx-auto my-20 flex flex-col gap-4 md:gap-6 lg:gap-8">
        <header>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            {page.title} - Hey Sainty
          </h1>
        </header>

        {content.map((block, index) => {
          const { type, data } = block;

          return (
            <section key={index}>
              {type === "header" &&
                React.createElement(
                  `h${data.level >= 1 && data.level <= 6 ? data.level : 3}`,
                  {
                    className: `font-bold text-lg md:text-xl lg:text-2xl pt-4 text-justify heading-level-${data.level}`,
                    dangerouslySetInnerHTML: isValidHTML(data.text)
                      ? { __html: data.text }
                      : undefined,
                  }
                )}

              {type === "paragraph" && isValidHTML(data.text) && (
                <div
                  className="text-md md:text-lg leading-relaxed text-justify"
                  dangerouslySetInnerHTML={{ __html: data.text }}
                />
              )}

              {type === "list" &&
                Array.isArray(data.items) &&
                (data.style === "ordered" ? (
                  <ol className="list-decimal pl-6 space-y-2 my-2 text-justify">
                    {data.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-md lg:text-lg text-justify"
                        dangerouslySetInnerHTML={
                          isValidHTML(item)
                            ? { __html: item }
                            : isValidHTML(item?.content)
                            ? { __html: item.content }
                            : undefined
                        }
                      />
                    ))}
                  </ol>
                ) : (
                  <ul className="list-disc pl-6 space-y-2 my-2 text-justify">
                    {data.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-md lg:text-lg text-justify"
                        dangerouslySetInnerHTML={
                          isValidHTML(item)
                            ? { __html: item }
                            : isValidHTML(item?.content)
                            ? { __html: item.content }
                            : undefined
                        }
                      />
                    ))}
                  </ul>
                ))}

              {type === "code" && (
                <pre className="p-3 rounded-md overflow-x-auto bg-gray-800 text-white border">
                  <code className="text-sm whitespace-pre-wrap">
                    {data.code}
                  </code>
                </pre>
              )}

              {type === "quote" && (
                <blockquote className="border-l-4 pl-4 my-4 text-lg border-gray-500 text-justify">
                  <p
                    className="mb-2 text-muted-foreground text-justify"
                    dangerouslySetInnerHTML={
                      isValidHTML(data.text) ? { __html: data.text } : undefined
                    }
                  />
                  {data.caption && (
                    <footer className="text-sm text-muted-foreground italic">
                      — {data.caption}
                    </footer>
                  )}
                </blockquote>
              )}

              {type === "table" && Array.isArray(data.content) && (
                <Table
                  className={`${
                    data.stretched ? "w-full" : "w-auto"
                  } my-4 border border-muted-foreground rounded-md text-justify`}
                >
                  <TableHeader>
                    {data.withHeadings && (
                      <TableRow className="border border-muted-foreground text-justify">
                        {data.content[0].map((heading, i) => (
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
                    {data.content
                      .slice(data.withHeadings ? 1 : 0)
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

              {type === "linkTool" && data?.meta && data.meta?.title && (
                <a
                  href={data.meta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted transition text-justify"
                >
                  <Image
                    src={`https://www.google.com/s2/favicons?sz=64&domain_url=${data.meta.url}`}
                    alt={`Favicon for ${data.meta.title}`}
                    className="w-12 h-12"
                    width={50}
                    height={50}
                    loading="lazy"
                  />
                  <div>
                    <div className="font-semibold text-base line-clamp-1">
                      {data.meta.title}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {data.meta.description}
                    </p>
                  </div>
                </a>
              )}

              {type === "delimiter" && (
                <hr className="my-6 border border-muted-foreground" />
              )}

              {type === "raw" && (
                <pre className="p-3 rounded-md overflow-x-auto bg-gray-800 text-white border">
                  <code className="text-sm">{data?.html}</code>
                </pre>
              )}
            </section>
          );
        })}
      </article>
    </section>
  );
}
