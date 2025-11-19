"use client";

import { Button } from "@/components/ui/button";
import { useUserAuth } from "@/context/user/authContext";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { RiLoader4Line, RiSendPlaneLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useBlogComment } from "@/context/blogCommentContext";
import { toast } from "sonner";

const Comment = ({ comment }) => {
  const { getUserInfo } = useUserAuth();
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useUserAuth();
  const [reply, setReply] = useState("");
  const { userCommentReply } = useBlogComment();
  const [replying, setReplying] = useState(false);

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

  const handleUserCommentReply = async () => {
    if (!reply || reply.trim() === "") {
      toast.error("Reply is empty", {
        description: "Please write something before replying",
      });
      return;
    }
    try {
      setReplying(true);
      const response = await userCommentReply(comment._id, reply);
      if (response.success) {
        comment.replies.push(response.reply);
        toast.success("Reply posted", {
          description: "Your reply has been posted.",
        });
        setReply("");
      } else {
        toast.error("Reply failed", {
          description: response.message,
        });
      }
    } catch (error) {
      toast.error("Error", {
        description:
          error.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setReplying(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 px-4 py-6 mb-5 border border-muted shadow-md rounded-xl">
      <div className="flex items-start gap-3">
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
        {/* replies */}
      </div>
      {comment.replies.length > 0 && (
        <div className="mt-4 flex flex-col gap-4 pl-12">
          {comment.replies.map((reply) => (
            <div key={reply.createdAt} className="flex items-start gap-3">
              {/* Avatar */}
              <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={
                    reply.actionBy === "admin"
                      ? "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/priyanshu.png"
                      : userInfo.profilePicture || "/default-avatar.png"
                  }
                  alt="profile pic"
                  width={28}
                  height={28}
                  className="object-cover"
                />
              </div>

              {/* Name + date + reply text */}
              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <h5 className="text-sm font-semibold">
                    {reply.actionBy === "admin"
                      ? "Admin • Hey Sainty"
                      : userInfo.name}
                  </h5>

                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(reply.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                {/* Reply content */}
                <p className="text-sm leading-relaxed mt-1 text-foreground">
                  {reply.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* continue conversation */}
      {user && user._id === comment.userId && (
        <div className="flex flex-col gap-3">
          <Textarea
            placeholder="Reply to this comment..."
            rows={2}
            className="text-lg rounded-xl border border-muted focus:ring-1 focus:ring-muted outline-none p-3"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <Button
            className="font-semibold rounded-lg px-4 py-2 w-full md:w-fit"
            onClick={handleUserCommentReply}
            disabled={replying}
          >
            {replying ? (
              <RiLoader4Line className="animate-spin" />
            ) : (
              <RiSendPlaneLine className="w-4 h-4" />
            )}
            Reply
          </Button>
        </div>
      )}
    </div>
  );
};

export default Comment;
