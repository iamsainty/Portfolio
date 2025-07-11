"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

async function getPage(permalink) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/page/${permalink}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    if (data.success) {
      return data.page;
    }
    return null;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

async function updatePage(formData, permalink) {
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/page/editpage/${permalink}`,
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
    console.error("Error updating page:", error);
    return false;
  }
}

export default function EditPage({ permalink }) {
  const [page, setPage] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState([]);
  const [pagePermalink, setPagePermalink] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [image, setImage] = useState(null);
  const editorRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    getPage(permalink).then((data) => {
      if (!data) return;

      setPage(data);
      setTitle(data.title || "");
      setDescription(data.description || "");
      setContent(JSON.parse(data.content) || []);
      setPagePermalink(data.permalink || "");
      setImage(data.coverimage || "");
    });
  }, [permalink]);

  useEffect(() => {
    if (!page || editorRef.current || typeof window === "undefined") return;

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
        placeholder: "Start writing your page...",
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
  }, [page]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setImageChanged(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      let pageData;
      try {
        pageData = await editorRef.current.save();
      } catch (err) {
        toast.error("Failed to get editor content");
        setIsSaving(false);
        return;
      }

      if (!title || !description || !pageData || !pagePermalink) {
        toast.error("All fields are required");
        return;
      }

      if (description.length < 130) {
        toast.error("Description should be at least 130 characters");
        setIsSaving(false);
        return;
      }

      if (description.length > 150) {
        toast.error("Description should be less than 150 characters");
        setIsSaving(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", JSON.stringify(pageData));
      formData.append("permalink", pagePermalink);
      if (imageChanged) {
        formData.append("coverimage", image);
      }

      const success = await updatePage(formData, pagePermalink);
      if (success) {
        toast.success("Page updated successfully");
        router.push(`/admin/dashboard/page/pages`);
      } else {
        toast.error("Failed to update page");
      }
    } catch (error) {
      console.error("Error updating page:", error);
      toast.error("Failed to update page");
    } finally {
      setIsSaving(false);
    }
  };

  if (!page) return <div>Loading...</div>;

  return (
    <section className="p-8 mb-24">
      <h2 className="text-4xl font-extrabold mb-8">Edit Page</h2>

      <div className="flex flex-col gap-12">
        <div
          className="w-[666px] h-[375px] border-2 bg-muted hover:bg-transparent rounded-lg cursor-pointer flex items-center justify-center"
          onClick={() => document.getElementById("imageInput").click()}
        >
          {imageChanged ? (
            <Image
              src={URL.createObjectURL(image)}
              alt="Page cover"
              className="object-cover w-full h-full rounded-md"
              width={666}
              height={375}
            />
          ) : (
            <Image
              src={image}
              alt="Page cover"
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

        <div id="editorjs" className="w-full" />

        <input
          type="text"
          placeholder="Enter permalink"
          value={pagePermalink}
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
