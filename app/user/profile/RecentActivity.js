"use client";

import { useUserAuth } from "@/context/user/authContext";
import React from "react";
import Activity from "./Activity";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const RecentActivity = () => {
  const { user } = useUserAuth();

  if (!user) {
    return (
      <section className="flex flex-col gap-8 sm:gap-10 w-full md:w-2/3">
        <div className="flex flex-col gap-2 pb-1">
          <Skeleton className="h-8 w-1/3 sm:w-1/4 md:w-1/5" />
          <Skeleton className="h-5 w-2/3 sm:w-1/2 md:w-1/3" />
        </div>
        <ul className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <li key={index}>
              <Skeleton className="h-16 w-full rounded-xl" />
            </li>
          ))}
        </ul>
        <Skeleton className="h-10 w-full rounded-md" />
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-8 sm:gap-10 w-full md:w-2/3">
      <div className="flex flex-col gap-2 pb-1">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
          Recent Activity
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          A quick look at your latest interactions and updates.
        </p>
      </div>
      <ul className="space-y-4">
        {user.notifications.slice(0, 10).map((notification, index) => (
          <li key={index}>
            <Activity notification={notification} />
          </li>
        ))}
      </ul>
      <Button variant="secondary">
        <Link href={"/user/notification"} className="w-full">
          View all
        </Link>
      </Button>
    </section>
  );
};

export default RecentActivity;
