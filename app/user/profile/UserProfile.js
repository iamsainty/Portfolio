"use client";

import React from "react";
import { useUserAuth } from "@/context/user/authContext";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { MdMailOutline, MdDateRange } from "react-icons/md";

const UserProfile = () => {
  const { user } = useUserAuth();
  // const joinedText = formatDistanceToNow(new Date(user.joinedAt), { addSuffix: true });
  const joinedText = "3 days ago";

  if (!user) return <div>Loading...</div>;
  return (
    <section className="flex flex-col lg:flex-row items-center gap-10 m-12">
      <div>
        <Image
          src={user.profilePicture}
          alt="user-profile-picture"
          className="rounded-3xl"
          width={200}
          height={200}
        />
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-4xl font-bold">{user.name}</h2>
        <p className="text-md flex items-center gap-2 text-muted-foreground">
          <MdMailOutline />
          {user.email}
        </p>
        <p className="text-md flex items-center gap-2 text-muted-foreground">
          <MdDateRange />
          Joined {joinedText}
        </p>
      </div>
    </section>
  );
};

export default UserProfile;
