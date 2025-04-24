import React from "react";
import UserActivity from "./UserActivity";

export const metadata = {
  title: "Notifications - Hey Sainty",
  description:
    "Stay updated with the latest alerts and updates from Hey Sainty.",
};

const page = () => {
  return (
    <div className="flex flex-col gap-20 m-8 md:m-14">
      <UserActivity />
    </div>
  );
};

export default page;
