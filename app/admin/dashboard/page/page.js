import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";
import Pages from "./Pages";

export const metadata = {
  title: "Pages - Hey Sainty",
  description: "Manage your pages on Hey Sainty",
};

export default function Page() {
  return (
    <div className="container mx-auto flex flex-col gap-10 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Manage Your Pages
      </h1>

      <div className="flex flex-col gap-4 border border-muted-foreground/20 bg-muted/10 p-6 rounded-xl w-fit shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Start Writing a New Page
        </h2>
        <p className="text-sm text-muted-foreground">
          Create a new page to add to your website to improve your SEO and user
          experience.
        </p>
        <Link href="/admin/dashboard/pages/newpage">
          <Button className="gap-2 px-4 py-2">
            <IoAdd className="text-xl" />
            Create Page
          </Button>
        </Link>
      </div>

      <h2 className="text-2xl font-medium">Your Pages</h2>
      <Pages />
    </div>
  );
}
