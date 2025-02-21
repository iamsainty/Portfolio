"use client";

import UserSignInDialog from "@/components/userAuth/UserSignInDialog";
import UserSignUpDialog from "@/components/userAuth/UserSignUpDialog";
import { useUserAuth } from "@/context/user/authContext";
import Image from "next/image";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useBlogComment } from "@/context/blogCommentContext";

const NewComment = ({ permalink }) => {
  const { user, loading } = useUserAuth();
  const { newComment } = useBlogComment();

  const [comment, setComment] = useState("");

  const handlePostComment = async () => {
    try {
      await newComment(permalink, comment);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading)
    return (
      <section className="w-full border border-muted-foreground rounded-xl px-4 py-6">
        <div className="animate-pulse flex flex-col gap-3">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-10 bg-gray-300 rounded w-full mt-2"></div>
        </div>
      </section>
    );

  return (
    <section className="w-full">
      {user ? (
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 md:gap-5 items-center">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-gray-200">
              <Image
                src={user.profilePicture || "/default-avatar.png"}
                alt="profile picture"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </div>
            <p className="text-sm md:text-lg">
              Comment as <span className="font-semibold">{user.name}</span>
            </p>
          </div>
          <Textarea
            placeholder="Write your thoughts here..."
            rows={4}
            className="text-lg rounded-xl border border-muted-foreground focus:ring-2 focus:ring-primary outline-none p-4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className="rounded-lg md:w-fit font-semibold px-6 py-2"
            onClick={handlePostComment}
          >
            Post Comment
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2 border border-muted-foreground rounded-xl p-6">
          <h4 className="text-lg font-semibold">Have something to share?</h4>
          <p className="text-sm text-muted-foreground">
            Join the conversation by signing in below!
          </p>
          <div className="flex gap-3 mt-3">
            <Button className="px-5 py-2">
              <UserSignInDialog />
            </Button>
            <Button
              variant="outline"
              className="px-5 py-2 border border-muted-foreground"
            >
              <UserSignUpDialog />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewComment;
