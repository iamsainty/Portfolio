"use client";

import { Separator } from "@/components/ui/separator";
import { useUserAuth } from "@/context/user/authContext";
import React from "react";

const UserStats = () => {
  const { user } = useUserAuth();

  if (!user) return null;

  return (
    <section className="flex flex-col gap-8 sm:gap-10">
      <div className="flex flex-col gap-2 pb-1">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
          Your Blog Journey
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          Here’s a snapshot of your interactions with blogs so far
        </p>
      </div>
      <div className="flex items-center justify-center sm:justify-start gap-6 sm:gap-8">
        <div className="text-center min-w-[72px]">
          <p className="text-4xl sm:text-5xl font-bold">20</p>
          <p className="text-sm sm:text-base text-muted-foreground">Comments</p>
        </div>
        <Separator orientation="vertical" className="h-16 sm:h-20" />
        <div className="text-center min-w-[72px]">
          <p className="text-4xl sm:text-5xl font-bold">100</p>
          <p className="text-sm sm:text-base text-muted-foreground">Likes</p>
        </div>
        <Separator orientation="vertical" className="h-16 sm:h-20" />
        <div className="text-center min-w-[72px]">
          <p className="text-4xl sm:text-5xl font-bold">7</p>
          <p className="text-sm sm:text-base text-muted-foreground">
            Bookmarked
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserStats;
