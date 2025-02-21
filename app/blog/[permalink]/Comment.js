"use client";

import { useUserAuth } from "@/context/user/authContext";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Comment = ({ comment }) => {
  const { getUserInfo } = useUserAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (comment.userId) {
        const user = await getUserInfo(comment.userId);
        setUserInfo(user);
      }
    };

    fetchUserInfo();
    // eslint-disable-next-line
  }, [comment.userId]);

  if (!userInfo) return <p>Loading...</p>;

  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="flex items-start gap-3 px-4 py-6 mb-5 border border-muted shadow-md hover:bg-muted hover:cursor-pointer rounded-xl">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Image
          src={userInfo.profilePicture}
          alt="profile pic"
          width={40}
          height={40}
          className="object-cover"
        />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-3">
          <h5 className="text-base font-bold">{userInfo.name}</h5>
          <p className="text-sm text-muted-foreground">{timeAgo}</p>
        </div>
        <p className="text-sm leading-relaxed">{comment.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
