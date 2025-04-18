import { Separator } from "@/components/ui/separator";
import React from "react";

const UserStats = () => {
  return (
    <section className="m-12 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Interaction Overview
        </h2>
        <p className="text-md text-muted-foreground">
          A quick summary of your interactions.
        </p>
      </div>
      <div className="flex items-center justify-start gap-8">
        <div className="text-center min-w-[100px]">
          <p className="text-5xl font-bold text-foreground">20</p>
          <p className="text-lg text-muted-foreground">Comments</p>
        </div>
        <Separator orientation="vertical" className="h-20" />
        <div className="text-center min-w-[100px]">
          <p className="text-5xl font-bold text-foreground">100</p>
          <p className="text-lg text-muted-foreground">Likes</p>
        </div>
      </div>
    </section>
  );
};

export default UserStats;
