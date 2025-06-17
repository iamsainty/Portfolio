import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-5 my-20">
      {[...Array(6)].map((_, index) => (
        <Card
          key={index}
          className="border-2 dark:border-2 w-[85vw] lg:w-[25vw] shadow-sm"
        >
          <CardHeader>
            <Skeleton className="w-full h-36 lg:h-44" />
          </CardHeader>
          <CardContent className="flex flex-col gap-3 my-1">
            <CardTitle className="text-md lg:text-lg font-bold text-wrap">
              <Skeleton className="w-4/5 h-8" />
            </CardTitle>
            <CardDescription className="text-sm lg:text-md text-wrap text-muted-foreground">
              <Skeleton className="w-full h-16" />
            </CardDescription>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-3 text-xs md:text-sm text-muted-foreground mt-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
