"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "sonner";

async function updateBlog(formData, permalink) {
  try {
    const adminToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("adminToken="))
      ?.split("=")[1];

    if (!adminToken) {
      toast.error("No admin token found");
      return false;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/editblog/${permalink}`,
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
    console.error("Error updating blog:", error);
    return false;
  }
}

async function getBlog(permalink) {
  try {
    const response = await fetch(`/api/blog/${permalink}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (data.success) {
      return data.blog;
    }
    return null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export default function EditBlog({ permalink }) {
  const [blog, setBlog] = useState(null);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState([]);
  const [tags, setTags] = useState("");
  const [blogPermalink, setBlogPermalink] = useState("");
  const [image, setImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const editorRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    getBlog(permalink).then((data) => {
      if (!data) return;

      setBlog(data);
      setTitle(data.title || "");
      setSummary(data.summary || "");
      setContent(JSON.parse(data.content) || []);
      setTags(data.tag?.join(", ") || "");
      setBlogPermalink(data.permalink || "");
      setImage(data.coverimage || "");
    });
  }, [permalink]);

  useEffect(() => {
    if (!blog || editorRef.current || typeof window === "undefined") return;

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
        data: { blocks: content.blocks || [] },
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
  }, [blog]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setImageChanged(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      let post;
      try {
        post = await editorRef.current.save();
      } catch (err) {
        toast.error("Failed to get editor content");
        setIsSaving(false);
        return;
      }

      if (!title || !post || !image || !blogPermalink) {
        toast.error("All fields are required");
        return;
      }

      if (summary.length < 130) {
        toast.error("Summary should be at least 130 characters");
        setIsSaving(false);
        return;
      }

      if (summary.length > 150) {
        toast.error("Summary should be less than 150 characters");
        setIsSaving(false);
        return;
      }

      const tagsArray = tags.split(",").map((tag) => tag.trim());

      const formData = new FormData();
      formData.append("title", title);
      formData.append("summary", summary);
      formData.append("content", JSON.stringify(post));
      formData.append("tags", tagsArray.join(","));
      formData.append("permalink", blogPermalink);
      if (imageChanged) {
        formData.append("coverimage", image);
      }

      const success = await updateBlog(formData, blogPermalink);
      if (success) {
        toast.success("Blog updated successfully");
        router.push(`/admin/dashboard/blog/blogs`);
      } else {
        toast.error("Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    } finally {
      setIsSaving(false);
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <section className="p-8 mb-24">
      <h2 className="text-4xl font-extrabold mb-8">Edit Blog</h2>

      <div className="flex flex-col gap-12">
        <div
          className="w-[666px] h-[375px] border-2 bg-muted hover:bg-transparent rounded-lg cursor-pointer flex items-center justify-center"
          onClick={() => document.getElementById("imageInput").click()}
        >
          {imageChanged ? (
            <Image
              src={URL.createObjectURL(image)}
              alt="Blog cover"
              className="object-cover w-full h-full rounded-md"
              width={666}
              height={375}
            />
          ) : (
            <Image
              src={image}
              alt="Blog cover"
              className="object-cover w-full h-full rounded-md"
              width={666}
              height={375}
            />
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

        <div id="editorjs" className="w-full" />

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
          value={blogPermalink}
          disabled
          className="focus:outline-none bg-transparent"
        />
      </div>
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
    </section>
  );
}
