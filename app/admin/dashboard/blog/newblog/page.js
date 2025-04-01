"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
const EditorJs = dynamic(() => import('@editorjs/editorjs'), { ssr: false });
const Header = dynamic(() => import('@editorjs/header'), { ssr: false });
const Paragraph = dynamic(() => import('@editorjs/paragraph'), { ssr: false });
const List = dynamic(() => import('@editorjs/list'), { ssr: false });
const Code = dynamic(() => import('@editorjs/code'), { ssr: false });
const Quote = dynamic(() => import('@editorjs/quote'), { ssr: false });
const LinkTool = dynamic(() => import('@editorjs/link'), { ssr: false });
const Table = dynamic(() => import('@editorjs/table'), { ssr: false });
const Delimiter = dynamic(() => import('@editorjs/delimiter'), { ssr: false });
const InlineCode = dynamic(() => import('@editorjs/inline-code'), { ssr: false });
const Raw = dynamic(() => import('@editorjs/raw'), { ssr: false });
import { blogCoverUpload } from "@/service/uploadToAWS";
import { useBlog } from "@/context/blogContext";
import dynamic from "next/dynamic";

export default function Page() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [permalink, setPermalink] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState(null);

  const { newBlog, getBlogpost, blogpost, loading } = useBlog();

  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) return;

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
          inlineCode: {
            class: InlineCode,
            inlineToolbar: true,
          },
          raw: {
            class: Raw,
            inlineToolbar: true,
          },
        },
        placeholder: "Start writing your post...",
      });

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePublish = async () => {
    try {
      const post = await editorRef.current.save();
      setContent(post);

      if (!title || !content || !image || !permalink) {
        setError("Please fill all the required fields.");
        return;
      }

      await getBlogpost(permalink);
      if (blogpost !== null) {
        setError("Permalink is already in use.");
        return;
      }

      const url = await blogCoverUpload(image, permalink);
      if (url === null) {
        setError("Failed to upload image. Please try again.");
        return;
      }

      setImageUrl(url);

      await newBlog(title, summary, content, tags, permalink, imageUrl);
    } catch (error) {
      if (error.message.includes("network")) {
        setError("Network error. Please try again later.");
      } else {
        setError("Failed to publish the blog. Please try again.");
      }
    }
  };

  return (
    <section className="p-8 mb-24">
      <h2 className="text-4xl font-extrabold mb-8">Create a New Blog Post</h2>
      <div className="flex flex-col gap-12">
        <div
          className="w-[666px] h-[375px] border-2 bg-muted hover:bg-transparent rounded-lg cursor-pointer flex items-center justify-center"
          onClick={() => document.getElementById("imageInput").click()}
        >
          {image ? (
            <Image
              src={URL.createObjectURL(image)}
              alt="Blog cover"
              className="object-cover w-full h-full rounded-md"
              width={64}
              height={48}
            />
          ) : (
            <span className="text-muted-foreground">
              Click to select a cover image
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
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-4xl font-bold focus:outline-none bg-transparent"
        />

        <input
          type="text"
          placeholder="Provide a short summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="focus:outline-none bg-transparent"
        />

        <div id="editorjs"></div>

        <input
          type="text"
          placeholder="Add tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="focus:outline-none bg-transparent"
        />

        <input
          type="text"
          placeholder="Enter permalink"
          value={permalink}
          onChange={(e) => setPermalink(e.target.value)}
          className="focus:outline-none bg-transparent"
        />

        {error && <div className="text-red-500 mt-4">{error}</div>}

        {loading ? (
          <div className="mt-4 text-gray-500">Publishing...</div>
        ) : (
          <Button className="w-fit" onClick={handlePublish}>
            Publish the blog
          </Button>
        )}
      </div>
    </section>
  );
}
