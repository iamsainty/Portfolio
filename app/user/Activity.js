"use client";

import React, { useEffect, useState } from "react";
import { FaRegBookmark, FaRegComments, FaRegHeart } from "react-icons/fa6";
import { BsReply } from "react-icons/bs";
import { IoLockClosedOutline } from "react-icons/io5";
import { BsPersonBoundingBox, BsImage } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaGoogle } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";
import { useUserAuth } from "@/context/user/authContext";
import { useBlog } from "@/context/blogContext";
import Link from "next/link";

const Activity = ({ notification }) => {
  const { userInfo, getUserInfo } = useUserAuth();
  const { blogpost, getBlogpost } = useBlog();
  const [name, setName] = useState("");
  const [blogTitle, setBlogTitle] = useState("");

  const userId = notification.relatedUserId;
  const blogPermalink = notification.relatedBlogPermalink;

  useEffect(() => {
    if (userId) {
      getUserInfo(userId);
    }
    if (blogPermalink) {
      getBlogpost(blogPermalink);
    }
  }, [userId, blogPermalink]);

  useEffect(() => {
    if (userInfo?.name) {
      setName(userInfo.name);
    }
  }, [userInfo]);

  useEffect(() => {
    if (blogpost?.title) {
      setBlogTitle(blogpost.title);
    }
  }, [blogpost]);

  return (
    <div>
      {notification.type === "welcomeMessage" && (
        <div className="w-full p-4 flex items-start gap-4 border hover:bg-muted transition rounded-xl">
          <div className="text-xl text-muted-foreground p-2 rounded-full bg-muted">
            <BsStars />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-sm sm:text-base text-foreground leading-snug">
              Welcome to the community! We&apos;re thrilled to have you with us.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      )}

      {notification.type === "passwordChange" && (
        <div className="w-full p-4 flex items-start gap-4 border hover:bg-muted transition rounded-xl">
          <div className="text-xl text-muted-foreground p-2 rounded-full bg-muted">
            <IoLockClosedOutline />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-sm sm:text-base text-foreground leading-snug">
              Your password was successfully changed. If you didn&apos;t make this
              change, please secure your account immediately.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      )}

      {notification.type === "passwordAdded" && (
        <div className="w-full p-4 flex items-start gap-4 border hover:bg-muted transition rounded-xl">
          <div className="text-xl text-muted-foreground p-2 rounded-full bg-muted">
            <MdPassword />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-sm sm:text-base text-foreground leading-snug">
              Your password has been successfully added. You can now log in on
              any device using your new password.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      )}

      {notification.type === "googleLinked" && (
        <div className="w-full p-4 flex items-start gap-4 border hover:bg-muted transition rounded-xl">
          <div className="text-xl text-muted-foreground p-2 rounded-full bg-muted">
            <FaGoogle />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-sm sm:text-base text-foreground leading-snug">
              Your Google account is now linked. Sign in quickly without needing
              a password.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      )}

      {notification.type === "commentAdded" && (
        <Link href={"/blog/" + blogPermalink}>
          <div className="w-full p-4 flex items-start gap-4 border hover:bg-muted transition rounded-xl">
            <div className="text-xl text-muted-foreground p-2 rounded-full bg-muted">
              <FaRegComments />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm sm:text-base text-foreground leading-snug">
                You commented on{" "}
                <span className="font-semibold">{blogTitle}</span>. Thanks for
                sharing your thoughts!
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </Link>
      )}

      {notification.type === "commentReplied" && (
        <Link href={"/blog/" + blogPermalink}>
          <div className="w-full p-4 flex items-start gap-4 border hover:bg-muted transition rounded-xl">
            <div className="text-xl text-muted-foreground p-2 rounded-full bg-muted">
              <BsReply />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm sm:text-base text-foreground leading-snug">
                <span className="font-semibold">{name}</span> replied to your
                comment on <span className="font-semibold">{blogTitle}</span>.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </Link>
      )}

      {notification.type === "blogLiked" && (
        <Link href={"/blog/" + blogPermalink}>
          <div className="w-full p-4 flex items-start gap-4 border hover:bg-muted transition rounded-xl">
            <div className="text-xl text-muted-foreground p-2 rounded-full bg-muted">
              <FaRegHeart />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm sm:text-base text-foreground leading-snug">
                You liked <span className="font-semibold">{blogTitle}</span>. We
                appreciate your support!
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </Link>
      )}

      {notification.type === "blogBookmarked" && (
        <Link href={"/blog/" + blogPermalink}>
          <div className="w-full p-4 flex items-start gap-4 border hover:bg-muted transition rounded-xl">
            <div className="text-xl text-muted-foreground p-2 rounded-full bg-muted">
              <FaRegBookmark />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm sm:text-base text-foreground leading-snug">
                You saved <span className="font-semibold">{blogTitle}</span> to
                your bookmarks for later.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </Link>
      )}

      {notification.type === "nameUpdated" && (
        <div className="w-full p-4 flex items-start gap-4 border hover:bg-muted transition rounded-xl">
          <div className="text-xl text-muted-foreground p-2 rounded-full bg-muted">
            <BsPersonBoundingBox />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-sm sm:text-base text-foreground leading-snug">
              Your display name has been successfully updated.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      )}

      {notification.type === "profilePicUpdated" && (
        <div className="w-full p-4 flex items-start gap-4 border hover:bg-muted transition rounded-xl">
          <div className="text-xl text-muted-foreground p-2 rounded-full bg-muted">
            <BsImage />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-sm sm:text-base text-foreground leading-snug">
              Your profile picture has been updated successfully.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      )}

      {notification.type === "emailNotifUpdated" && (
        <div className="w-full p-4 flex items-start gap-4 border hover:bg-muted transition rounded-xl">
          <div className="text-xl text-muted-foreground p-2 rounded-full bg-muted">
            <IoMdNotificationsOutline />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <p className="text-sm sm:text-base text-foreground leading-snug">
              Your email notification preferences have been updated.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;
