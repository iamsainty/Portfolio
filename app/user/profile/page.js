import React from "react";
import UserProfile from "./UserProfile";
import UserStats from "./UserStats";
import RecentActivity from "./RecentActivity";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Profile - Hey Sainty",
  description:
    "View and manage your personal profile information on Hey Sainty.",
};

const page = () => {
  return (
    <div className="flex flex-col gap-20 m-8 md:m-14">
      <UserProfile />
      <Separator />
      <UserStats />
      <Separator />
      <RecentActivity />
    </div>
  );
};

export default page;
