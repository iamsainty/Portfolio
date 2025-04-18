"use client";

import React from "react";
import { useUserAuth } from "@/context/user/authContext";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { MdMailOutline, MdDateRange } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfile = () => {
  const { user } = useUserAuth();
  // const joinedText = formatDistanceToNow(new Date(user.joinedAt), { addSuffix: true });
  const joinedText = "3 days ago";

  if (!user) {
    return (
      <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12 min-w-0">
        <div className="p-2">
          <Skeleton className="rounded-3xl w-[175px] h-[175px] sm:w-[200px] sm:h-[200px] md:w-[225px] md:h-[225px] lg:w-[250px] lg:h-[250px]" />
        </div>
        <div className="flex flex-col gap-3 md:text-left">
          <Skeleton className="h-6 sm:h-8 md:h-10 lg:h-12 w-[250px] sm:w-[300px] md:w-[350px]" />
          <Skeleton className="h-5 sm:h-6 md:h-7 w-[250px] sm:w-[300px] md:w-[350px]" />
          <Skeleton className="h-5 sm:h-6 md:h-7 w-[250px] sm:w-[300px] md:w-[350px]" />
        </div>
      </section>
    );
  }
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12 min-w-0">
      <div className="p-2">
        <Image
          src={user.profilePicture}
          alt="user-profile-picture"
          className="rounded-3xl w-[175px] h-[175px] sm:w-[200px] sm:h-[200px] md:w-[225px] md:h-[225px] lg:w-[250px] lg:h-[250px] object-cover"
          width={250}
          height={250}
        />
      </div>
      <div className="flex flex-col gap-3 text-center md:text-left">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
          {user.name}
        </h2>
        <p className="text-sm sm:text-base md:text-lg flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
          <MdMailOutline className="text-lg" />
          {user.email}
        </p>
        <p className="text-sm sm:text-base md:text-lg flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
          <MdDateRange className="text-lg" />
          Joined {joinedText}
        </p>
      </div>
    </section>
  );
};

export default UserProfile;
