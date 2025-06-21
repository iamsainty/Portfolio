import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <section className="md:w-4/5 lg:w-3/5 container px-6 flex flex-col gap-3">
      <article className="w-full mx-auto my-20 flex flex-col gap-4 md:gap-6 lg:gap-8">
        <header>
          <Skeleton className="h-10 md:h-12 lg:h-14 w-3/4 rounded-md" />
        </header>

        {[...Array(5)].map((_, i) => (
          <section key={i} className="space-y-3">
            <Skeleton className="h-6 w-1/3 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-11/12 rounded" />
            <Skeleton className="h-4 w-10/12 rounded" />
          </section>
        ))}

        <div className="space-y-2">
          <Skeleton className="h-6 w-24 rounded" />
          <Skeleton className="h-32 w-full rounded-md" />
        </div>

        <div className="border-l-4 pl-4 border-gray-500 space-y-2">
          <Skeleton className="h-4 w-4/5 rounded" />
          <Skeleton className="h-4 w-1/3 rounded" />
        </div>

        <div className="space-y-2">
          {[...Array(4)].map((_, row) => (
            <div key={row} className="flex gap-2">
              {[...Array(4)].map((_, col) => (
                <Skeleton key={col} className="h-6 w-1/4 flex-1 rounded" />
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 p-4 border rounded-lg">
          <Skeleton className="h-12 w-12 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </article>
    </section>
  );
}
