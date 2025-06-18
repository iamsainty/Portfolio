"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

async function adminLogin(email, password) {
  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

async function getAdminProfile() {
  try {
    const adminToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("adminToken="))
      ?.split("=")[1];

    if (!adminToken) {
      return null;
    }
    const response = await fetch("/api/admin/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        adminToken: adminToken,
      },
    });

    const data = await response.json();

    if (!data.success) {
      return null;
    }

    return data.admin;
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return null;
  }
}

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const admin = await getAdminProfile();
      if (admin !== null) {
        router.push("/admin/dashboard");
      }
    };

    fetchAdminProfile();
  }, []);

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      const response = await adminLogin(email, password);

      if (response.success) {
        toast.success("Login successful");
        document.cookie = `adminToken=${response.token}; path=/; max-age=${
          7 * 24 * 60 * 60
        }`;
        router.push("/admin/dashboard");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex min-h-[75vh] mb-[10vh] items-center mx-8 justify-center lg:mx-auto">
      <Card className="border border-muted-foreground w-full lg:w-1/4 space-y-5">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl lg:text-2xl">
            Admin Login
          </CardTitle>
          <CardDescription>Login to your admin account</CardDescription>
        </CardHeader>
        <form onSubmit={handleAdminLogin}>
          <CardContent className="space-y-5">
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full text-md"
            />
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full text-md"
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
