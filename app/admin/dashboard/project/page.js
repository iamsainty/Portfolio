import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";
import Projects from "./Projects";

export default function Page() {
  return (
    <div className="container mx-auto flex flex-col gap-10 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Manage Your Projects
      </h1>

      <div className="flex flex-col gap-4 border border-muted-foreground/20 bg-muted/10 p-6 rounded-xl w-fit shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">
          Add a New Project
        </h2>
        <p className="text-sm text-muted-foreground">
          Made an awesome project? Add it here and let the world know about it.
        </p>
        <Link href="/admin/dashboard/project/newproject">
          <Button className="gap-2 px-4 py-2">
            <IoAdd className="text-xl" />
            Add Project
          </Button>
        </Link>
      </div>

      <h2 className="text-2xl font-medium">Your Projects</h2>

      <Projects />
    </div>
  );
}
