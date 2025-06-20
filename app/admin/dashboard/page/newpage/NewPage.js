"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import { LuLoaderCircle } from "react-icons/lu";
import { useRouter } from "next/navigation";

async function newPage(formData) {
  try {
    const adminToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("adminToken="))
      ?.split("=")[1];
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/page/newpage`,
      {
        method: "POST",
        headers: {
          adminToken: adminToken,
        },
        body: formData,
      }
    );
    const data = await response.json();

    return data.success;
  } catch (error) {
    console.error("Error creating new page:", error);
    return false;
  }
}

export default function NewPage() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [permalink, setPermalink] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef(null);
  const router = useRouter();
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
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/fetch-link-data`,
              withCredentials: true,
            },
          },
          table: { class: Table, inlineToolbar: true },
          delimiter: { class: Delimiter, inlineToolbar: true },
          inlineCode: { class: InlineCode, inlineToolbar: true },
          raw: { class: Raw, inlineToolbar: true },
        },
        placeholder: "Start writing your post...",
      });

      editorRef.current = editor;
      editor.isReady.then(() => {
        const editorElement = document.getElementById("editorjs");

        let timeout;
        const observer = new MutationObserver(() => {
          clearTimeout(timeout);
          timeout = setTimeout(() => styleEditorContent(), 150);
        });

        observer.observe(editorElement, {
          childList: true,
          subtree: true,
        });

        styleEditorContent();
      });
    }

    function styleEditorContent() {
      const editorElement = document.getElementById("editorjs");
      if (!editorElement) return;

      editorElement.querySelectorAll("h1").forEach((el) => {
        el.className = "font-bold text-2xl md:text-3xl lg:text-4xl mt-6 mb-3";
      });
      editorElement.querySelectorAll("h2").forEach((el) => {
        el.className =
          "font-semibold text-xl md:text-2xl lg:text-3xl mt-5 mb-3";
      });
      editorElement.querySelectorAll("h3").forEach((el) => {
        el.className = "font-medium text-lg md:text-xl lg:text-2xl mt-4 mb-2";
      });

      editorElement.querySelectorAll("p").forEach((el) => {
        el.className = "text-base md:text-lg my-3";
      });

      editorElement.querySelectorAll("ul").forEach((el) => {
        el.className = "list-disc pl-6 space-y-2 my-3 text-base md:text-lg ";
      });
      editorElement.querySelectorAll("ol").forEach((el) => {
        el.className = "list-decimal pl-6 space-y-2 my-3 text-base md:text-lg ";
      });
      editorElement.querySelectorAll("li").forEach((el) => {
        el.classList.add("text-base", "md:text-lg");
      });

      editorElement.querySelectorAll("pre").forEach((el) => {
        el.className =
          "p-4 rounded-md overflow-x-auto bg-muted text-white border border-muted my-4";
      });
      editorElement.querySelectorAll("code").forEach((el) => {
        el.classList.add("text-sm", "font-mono");
      });

      editorElement.querySelectorAll("blockquote").forEach((el) => {
        el.className =
          "border-l-4 pl-4 my-4 text-lg border-blue-500 bg-muted italic";
      });

      editorElement.querySelectorAll("hr").forEach((el) => {
        el.className = "my-8 border-t border-muted";
      });

      editorElement.querySelectorAll("table").forEach((el) => {
        el.className =
          "my-6 w-full border border-muted rounded-md overflow-hidden text-sm md:text-base text-left";
      });
      editorElement.querySelectorAll("th").forEach((el) => {
        el.className = "bg-muted px-4 py-2 border border-muted font-semibold";
      });
      editorElement.querySelectorAll("td").forEach((el) => {
        el.className = "px-4 py-2 border border-muted";
      });
    }

    loadEditor();

    return () => {
      (async () => {
        if (editorRef.current?.destroy) {
          await editorRef.current.destroy();
          editorRef.current = null;
        }
      })();
    };
  }, []);

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let pagedata;
      try {
        pagedata = await editorRef.current.save();
      } catch (err) {
        toast.error("Failed to get editor content");
        setIsSaving(false);
        return;
      }
      if (!title || !pagedata || !image || !permalink) {
        toast.error("All fields are required");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", JSON.stringify(pagedata));
      formData.append("permalink", permalink);
      formData.append("coverimage", image);

      const success = await newPage(formData);
      if (success) {
        toast.success("Page published successfully");
        router.push("/admin/dashboard/page/pages");
      } else {
        toast.error("Failed to publish the page. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to publish the page. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="p-8 mb-24">
      <h2 className="text-4xl font-extrabold mb-8">Create a New Page</h2>
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
          placeholder="Enter page title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-4xl font-bold focus:outline-none bg-transparent"
        />

        <input
          type="text"
          placeholder="Provide a short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="focus:outline-none bg-transparent"
        />

        <div id="editorjs"></div>

        <input
          type="text"
          placeholder="Enter permalink"
          value={permalink}
          onChange={(e) => setPermalink(e.target.value)}
          className="focus:outline-none bg-transparent"
        />

        {isSaving ? (
          <Button className="my-10 px-10 w-fit" disabled>
            <LuLoaderCircle className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </Button>
        ) : (
          <Button className="my-10 px-10 w-fit" onClick={handleSave}>
            Save
          </Button>
        )}
      </div>
    </section>
  );
}
