"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { Skeleton } from "@/components/ui/skeleton";
import { IoPeopleOutline } from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";
import { FiRepeat } from "react-icons/fi";
import Comment from "./Comment";

async function getComments() {
  try {
    const adminToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("adminToken="))
      ?.split("=")[1];

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogcomment/getcomment`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          adminToken,
        },
      }
    );
    const data = await response.json();
    return data.success ? data.comments : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function ManageComment() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const comments = await getComments();
        setComments(comments);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const commentsLast30Days = comments.filter((comment) => {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    return new Date(comment.createdAt) >= last30Days;
  });

  const totalCommentReplies = comments.reduce((acc, comment) => {
    return acc + comment.replies.length;
  }, 0);

  return (
    <div className="flex flex-col gap-10">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manage Comments</h1>
        <p className="text-base text-muted-foreground">
          View and manage all the comments on your website.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 rounded-2xl shadow-md border text-center hover:bg-muted/50">
          <CardHeader className="flex items-center justify-center mb-2">
            <IoPeopleOutline size={24} />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <CardTitle>Total Comments</CardTitle>
            <CardDescription>{comments.length} comments</CardDescription>
          </CardContent>
        </Card>

        <Card className="p-6 rounded-2xl shadow-md border text-center hover:bg-muted/50">
          <CardHeader className="flex items-center justify-center mb-2">
            <BsClockHistory size={24} />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <CardTitle>Comments in last 30 days</CardTitle>
            <CardDescription>
              {commentsLast30Days.length} comments
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="p-6 rounded-2xl shadow-md border text-center hover:bg-muted/50">
          <CardHeader className="flex items-center justify-center mb-2">
            <FiRepeat size={24} />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <CardTitle>Comment Replies</CardTitle>
            <CardDescription>{totalCommentReplies} replies</CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">All Comments</h2>

        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}
