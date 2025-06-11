import { Button } from "@/components/ui/button";
import { IoAdd } from "react-icons/io5";
import Blogs from "./Blogs";
import Link from "next/link";

export const metadata = {
  title: "Manage Your Blogs",
  description: "The admin dashboard for managing your blogs",
};

export default function Page() {
  return (
    <div className="container mx-auto flex flex-col gap-10 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Manage Your Blogs
      </h1>

      <div className="flex flex-col gap-4 border border-muted-foreground/20 bg-muted/10 p-6 rounded-xl w-fit shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Start Writing a New Blog
        </h2>
        <p className="text-sm text-muted-foreground">
          Got an idea or a story to share? Publish your thoughts and let the
          world read them.
        </p>
        <Link href="/admin/dashboard/blog/newblog">
          <Button className="gap-2 px-4 py-2">
            <IoAdd className="text-xl" />
            Create Blog
          </Button>
        </Link>
      </div>

      <h2 className="text-2xl font-medium">Your Blogs</h2>
      <Blogs />
    </div>
  );
}
