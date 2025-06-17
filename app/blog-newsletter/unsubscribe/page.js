import { Suspense } from "react";
import ManageSubscription from "./ManageSubscription";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Manage Newsletter Subscription - Hey Sainty",
  description:
    "Manage your email newsletter subscription preferences with Hey Sainty. Subscribe or unsubscribe anytime with ease.",
  robots: "noindex, nofollow",
};

export default function Page() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="min-h-[80vh] flex flex-col items-center justify-center mb-[10vh] max-w-[80vw] mx-auto">
            <div className="flex flex-col w-full max-w-2xl gap-6 sm:gap-7">
              <Skeleton className="h-8 w-3/4 sm:w-1/2" />
              <Skeleton className="h-6 w-5/6 sm:w-3/4" />

              <div className="flex flex-col gap-3">
                {Array(5)
                  .fill(0)
                  .map((_, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Skeleton className="h-5 w-5" />
                      <Skeleton className="h-4 w-1/2 sm:w-3/4" />
                    </div>
                  ))}
              </div>

              <Skeleton className="h-10 w-1/3 mt-4" />
            </div>
          </div>
        }
      >
        <ManageSubscription />
      </Suspense>
    </div>
  );
}
