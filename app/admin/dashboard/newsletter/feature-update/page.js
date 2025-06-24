"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RiLoader4Line } from "react-icons/ri";
import { toast } from "sonner";

async function sendNewsletter(title, content, link) {
  try {
    const adminToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("adminToken="))
      ?.split("=")[1];
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletter/update-feature`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          adminToken: adminToken,
        },
        body: JSON.stringify({ title, content, link }),
      }
    );

    const data = await response.json();

    return data.success;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default function FeatureUpdate() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
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
    try {
      setLoading(true);
      const content = await editorRef.current.save();

      if (!title.trim() || !link.trim()) {
        toast.error("All fields are required");
        return;
      }
      const success = await sendNewsletter(title, content, link);
      if (success) {
        toast.success("Newsletter sent successfully");
        router.push("/admin/dashboard");
      } else {
        toast.error("Failed to send newsletter");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send newsletter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-8 mb-24">
      <h2 className="text-3xl font-extrabold mb-8">
        Send Newsletter about Feature Update
      </h2>
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
          placeholder="Enter the link to the feature update"
          value={link}
          onChange={(e) => setLink(e.target.value)}
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
