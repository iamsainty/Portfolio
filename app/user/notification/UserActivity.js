"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Activity from "../Activity";
import { useUserAuth } from "@/context/user/authContext";

const UserActivity = () => {
  const { user } = useUserAuth();

  if (!user) {
    return (
      <section className="flex flex-col gap-8 sm:gap-10 w-full md:w-2/3">
        <div className="flex flex-col gap-2 pb-1">
          <Skeleton className="h-8 w-1/3 sm:w-1/4 md:w-1/5" />
          <Skeleton className="h-5 w-2/3 sm:w-1/2 md:w-1/3" />
        </div>
        <ul className="space-y-4">
          {[...Array(5)].map((_, index) => (
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
          Your activity so far
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          Here’s what’s been happening in your profile and how you are
          interacting content
        </p>
      </div>
      <ul className="space-y-4">
        {[...user.notifications]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((notification, index) => (
            <li key={index}>
              <Activity notification={notification} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default UserActivity;
