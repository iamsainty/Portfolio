"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { RiLoader4Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
async function sendNewsletter(title, content, permalink) {
  try {
    const adminToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("adminToken="))
      ?.split("=")[1];

    const response = await fetch("/api/newsletter/blog/newLetter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        adminToken: adminToken,
      },
      body: JSON.stringify({ title, content, permalink }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Newsletter send error:", error);
    return null;
  }
}

export default function Page() {
  const [title, setTitle] = useState("");
  const [blogPermalink, setBlogPermalink] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const editorRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || editorRef.current) return;

    async function loadEditor() {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      const Paragraph = (await import("@editorjs/paragraph")).default;
      const List = (await import("@editorjs/list")).default;
      const Code = (await import("@editorjs/code")).default;
      const Quote = (await import("@editorjs/quote")).default;
      const LinkTool = (await import("@editorjs/link")).default;
      const Table = (await import("@editorjs/table")).default;
      const Delimiter = (await import("@editorjs/delimiter")).default;
      const InlineCode = (await import("@editorjs/inline-code")).default;
      const Raw = (await import("@editorjs/raw")).default;

      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: { class: Header, inlineToolbar: ["link"] },
          paragraph: { class: Paragraph, inlineToolbar: true },
          list: { class: List, inlineToolbar: true },
          code: { class: Code, inlineToolbar: true },
          quote: { class: Quote, inlineToolbar: true },
          linkTool: { class: LinkTool, inlineToolbar: true },
          table: { class: Table, inlineToolbar: true },
          delimiter: { class: Delimiter, inlineToolbar: true },
          inlineCode: { class: InlineCode, inlineToolbar: true },
          raw: { class: Raw, inlineToolbar: true },
        },
        placeholder: "Start writing your content...",
      });

      editorRef.current = editor;
    }

    loadEditor();

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleSend = async () => {
    if (!title.trim() || !blogPermalink.trim()) {
      toast.error("Missing fields", {
        description: "Please fill in both the title and permalink.",
      });
      return;
    }

    try {
      setLoading(true);
      const content = await editorRef.current.save();
      const response = await sendNewsletter(title, content, blogPermalink);

      if (response.success) {
        toast.success("Success!", {
          description: response.message,
        });

        router.push("/admin/dashboard/");

        setTitle("");
        setBlogPermalink("");
        await editorRef.current.render({ blocks: [] });
      } else {
        toast.error("Failed to send", {
          description: response.message || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Newsletter send error:", error);
      toast.error("Error", {
        description: "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-8 mb-24">
      <h2 className="text-4xl font-extrabold mb-8">Send Blog Newsletter</h2>
      <div className="flex flex-col gap-12">
        <input
          type="text"
          placeholder="Enter newsletter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-4xl font-bold focus:outline-none bg-transparent"
        />
        <div id="editorjs"></div>
        <input
          type="text"
          placeholder="Enter blog permalink"
          value={blogPermalink}
          onChange={(e) => setBlogPermalink(e.target.value)}
          className="focus:outline-none bg-transparent"
        />

        {loading ? (
          <Button disabled className="self-start mt-2 flex items-center gap-2">
            <RiLoader4Line className="animate-spin" />
            Sending
          </Button>
        ) : (
          <Button
            onClick={handleSend}
            className="self-start mt-2 flex items-center gap-2"
          >
            Send Newsletter
          </Button>
        )}
      </div>
    </section>
  );
}
