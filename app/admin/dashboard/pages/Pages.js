"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";
async function getPages() {
  try {
    const response = await fetch("/api/pages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      return data.pages;
    }

    return [];
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
}

async function deletePage(permalink) {
  try {
    const adminToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("adminToken="))
      ?.split("=")[1];
    const response = await fetch(`/api/pages/deletepage/${permalink}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        adminToken: adminToken,
      },
    });

    const data = await response.json();

    return data.success;
  } catch (error) {
    console.error("Error deleting page:", error);
    return false;
  }
}

export default function Pages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deletePageTitle, setDeletePageTitle] = useState("");
  const [deletePagePermalink, setDeletePagePermalink] = useState("");

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const pages = await getPages();
        setPages(pages);
      } catch (error) {
        console.error("Error fetching pages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const handleDelete = async () => {
    try {
      const success = await deletePage(deletePagePermalink);
      if (success) {
        toast.success("Page deleted successfully");
        setPages(
          pages.filter((page) => page.permalink !== deletePagePermalink)
        );
        setDeleteDialog(false);
      } else {
        toast.error("Failed to delete page");
      }
    } catch (error) {
      console.error("Error deleting page:", error);
      toast.error("Failed to delete page");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-5">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex items-start gap-4 border border-muted-foreground/20 p-4 rounded-lg shadow-sm"
          >
            <Skeleton className="w-[20%] h-[100px] rounded-md" />
            <div className="flex-1 space-y-2 w-[70%]">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="flex gap-2 justify-evenly items-center w-[10%]">
              <Skeleton className="w-10 h-10 rounded-md" />
              <Skeleton className="w-10 h-10 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <AlertDialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <AlertDialogContent className="flex flex-col gap-6 rounded-2xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold">
              Are you sure?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="text-muted-foreground text-base">
            This action will permanently delete the page below. This action
            cannot be undone.
          </AlertDialogDescription>

          <div className="bg-muted/50 px-4 py-3 rounded-md border border-muted-foreground/20 text-sm font-medium text-foreground shadow-sm">
            <span className="line-clamp-2">{deletePageTitle}</span>
          </div>

          <AlertDialogFooter className="flex gap-3">
            <Button variant="outline" onClick={() => setDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirm Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {pages.map((page) => (
        <div
          key={page._id}
          className="flex items-start gap-4 border border-muted-foreground/20 p-4 rounded-lg hover:shadow-sm transition"
        >
          <Image
            src={page.coverimage}
            alt={page.title}
            width={100}
            height={100}
            className="object-cover rounded-md w-[20%]"
          />
          <div className="flex-1 flex flex-col gap-1 w-[70%]">
            <h3 className="text-lg font-semibold line-clamp-1">{page.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {page.description}
            </p>
          </div>
          <div className="flex gap-2 justify-evenly items-center w-[10%]">
            <Link href={`/admin/dashboard/pages/editpage/${page.permalink}`}>
              <Button variant="outline" className="p-2 hover:bg-muted/50">
                <CiEdit className="text-xl" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="p-2 hover:bg-red-500 hover:text-white transition-colors"
              onClick={() => {
                setDeleteDialog(true);
                setDeletePagePermalink(page.permalink);
                setDeletePageTitle(page.title);
              }}
            >
              <AiOutlineDelete className="text-xl" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
