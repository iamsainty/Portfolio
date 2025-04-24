import React from "react";
import EditName from "./EditName";
import EditProfilePicture from "./EditProfilePicture";
import { Separator } from "@/components/ui/separator";
import EditNotifications from "./EditNotifications";

export const metadata = {
  title: "Edit Profile - Hey Sainty",
  description:
    "Update your personal details, profile picture, and account settings on Hey Sainty.",
};

const page = () => {
  return (
    <div className="flex flex-col gap-20 m-8 md:m-14">
      <EditName />
      <Separator />
      <EditProfilePicture />
      <Separator />
      <EditNotifications />
    </div>
  );
};

export default page;
