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
import { FaGoogle } from "react-icons/fa";

async function getUsers() {
  try {
    const adminToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("adminToken="))
      ?.split("=")[1];

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getusers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          adminToken,
        },
      }
    );

    const data = await response.json();
    return data.success ? data.users : [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const users = await getUsers();
      setUsers(users);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-10">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card
              key={`stats-${index}`}
              className="p-6 rounded-2xl shadow-md border text-center"
            >
              <CardHeader className="flex items-center justify-center mb-2">
                <Skeleton className="h-6 w-6 rounded-full" />
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Users Skeleton */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-40" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card
                key={`user-${index}`}
                className="p-6 rounded-2xl shadow-md border bg-background flex flex-col items-center text-center"
              >
                <Skeleton className="h-16 w-16 mb-3 rounded-full" />
                <Skeleton className="h-4 w-28 mb-2" />
                <Skeleton className="h-4 w-40 mb-2" />
                <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                  <CiCalendar size={16} />
                  <Skeleton className="h-4 w-24" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const usersLast30Days = users.filter((user) => {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    return new Date(user.createdAt) >= last30Days;
  });

  const googleUsers = users.filter((user) => user.googleId);

  return (
    <div className="flex flex-col gap-10">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
        <p className="text-base text-muted-foreground">
          View and manage all the users of your website.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 rounded-2xl shadow-md border text-center hover:bg-muted/50">
          <CardHeader className="flex items-center justify-center mb-2">
            <IoPeopleOutline size={24} />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <CardTitle>Total Users</CardTitle>
            <CardDescription>{users.length} users</CardDescription>
          </CardContent>
        </Card>

        <Card className="p-6 rounded-2xl shadow-md border text-center hover:bg-muted/50">
          <CardHeader className="flex items-center justify-center mb-2">
            <BsClockHistory size={24} />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <CardTitle>Joined in last 30 days</CardTitle>
            <CardDescription>{usersLast30Days.length} users</CardDescription>
          </CardContent>
        </Card>

        <Card className="p-6 rounded-2xl shadow-md border text-center hover:bg-muted/50">
          <CardHeader className="flex items-center justify-center mb-2">
            <FaGoogle size={24} />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <CardTitle>Google Sign-ins</CardTitle>
            <CardDescription>{googleUsers.length} users</CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* User Cards */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">All Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card
              key={user._id}
              className="p-6 rounded-2xl shadow-md border bg-background flex flex-col items-center text-center hover:bg-muted/50"
            >
              <Avatar className="h-16 w-16 mb-3">
                <AvatarImage src={user.profilePicture} />
                <AvatarFallback className="text-lg font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <CardTitle className="text-lg font-semibold text-foreground">
                {user.name}
              </CardTitle>

              <CardDescription className="text-sm text-muted-foreground truncate max-w-xs">
                {user.email}
              </CardDescription>

              <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                <CiCalendar size={16} />
                <span>{format(new Date(user.createdAt), "dd MMM yyyy")}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
