import React from "react";
import EditName from "./EditName";
import EditProfilePicture from "./EditProfilePicture";
import { Separator } from "@/components/ui/separator";
import EditNotifications from "./EditNotifications";

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
