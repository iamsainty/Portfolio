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
import { useState } from "react";
import { useRouter } from "next/navigation";

async function adminLogin(email, password) {
  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const status = response.status;
  const data = await response.json();

  return { status, data };
}

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before validation

    if (!email) {
      setError("Email is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      const response = await adminLogin(email, password);
      if (response.status === 200) {
        localStorage.setItem("adminToken", response.data.token);
        router.push("/admin/dashboard");
      } else {
        setError(response.data.message);
        setTimeout(() => setError(null), 5000);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
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
              aria-describedby={error ? "error-message" : undefined}
            />
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full text-md"
              aria-describedby={error ? "error-message" : undefined}
            />
            {error && (
              <p id="error-message" className="text-red-500 text-sm">
                {error}
              </p>
            )}
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
