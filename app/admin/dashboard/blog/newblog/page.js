"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import EditorJs from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Quote from "@editorjs/quote";
import LinkTool from "@editorjs/link";
import Table from "@editorjs/table";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import Raw from "@editorjs/raw";

export default function Page() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [permalink, setPermalink] = useState("");
  const [tags, setTags] = useState("");

  const editorRef = useRef(null);

  useEffect(() => {
    // Check if the editor is already initialized
    if (editorRef.current) return; // Prevent multiple initializations

    // Ensure the DOM element is available
    const editorElement = document.getElementById("editorjs");

    if (editorElement) {
      const editor = new EditorJs({
        holder: "editorjs",
        tools: {
          header: {
            class: Header,
            inlineToolbar: ["link"],
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          code: {
            class: Code,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          linkTool: {
            class: LinkTool,
            inlineToolbar: true,
          },
          table: {
            class: Table,
            inlineToolbar: true,
          },
          delimiter: {
            class: Delimiter,
            inlineToolbar: true,
          },
          inlineCode:{
            class: InlineCode,
            inlineToolbar: true,
          },
          raw: {
            class : Raw,
            inlineToolbar: true,
          },
        },
        placeholder: "Start typing your blog content here...",
      });

      editorRef.current = editor;
    }

    // Cleanup function to destroy the editor when the component is unmounted or updated
    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(e.target.files[0])); // Store the file instead of Base64
    }
  };
  return (
    <section className="p-8 mb-24">
      <h2 className="text-4xl font-extrabold mb-8">
        Add a new blog post
      </h2>
      <div className="flex flex-col gap-12">
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
            <span className="text-muted-foreground">
              Click to select blog cover image
            </span>
          )}
        </div>
        <Input
          id="imageInput"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />

        <input
          type="text"
          placeholder="Blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-4xl font-bold focus:outline-none bg-transparent"
        />

        <input
          type="text"
          placeholder="Blog summary..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className=" focus:outline-none bg-transparent"
        />

        <div id="editorjs"></div>

        <input
          type="text"
          placeholder="Blog tags separated by comma..."
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className=" focus:outline-none bg-transparent"
        />

        <input
          type="text"
          placeholder="Permalink"
          value={permalink}
          onChange={(e) => setPermalink(e.target.value)}
          className="focus:outline-none bg-transparent"
        />

        <Button className="w-fit">Publish the blog</Button>
      </div>
    </section>
  );
}
