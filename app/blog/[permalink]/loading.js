import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="px-6 py-10 md:py-14 lg:py-16 flex flex-col justify-evenly items-center gap-10 lg:w-3/5 mx-auto">
      <div className="border px-4 py-2 rounded-full mb-8 bg-gray-50 dark:bg-gray-800 dark:text-white">
        <div className="flex space-x-2 text-xs md:text-sm">
          <Skeleton className="h-4 w-12" />
          <span>/</span>
          <Skeleton className="h-4 w-12" />
          <span>/</span>
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      <div className="text-center w-full mx-auto flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
        <Skeleton className="h-10 w-full" />
        <div className="flex flex-row items-center justify-center space-x-2 text-sm md:text-base text-muted-foreground">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>

      <Skeleton className="w-full h-[300px] md:h-[450px] lg:h-[600px] rounded-xl" />
    </div>
  );
}
