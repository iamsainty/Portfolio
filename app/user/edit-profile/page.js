import React from "react";
import EditName from "./EditName";
import EditProfilePicture from "./EditProfilePicture";

const page = () => {
  return (
    <div className="flex flex-col gap-20 m-8 md:m-14">
      <EditName />
      <EditProfilePicture />
    </div>
  );
};

export default page;
