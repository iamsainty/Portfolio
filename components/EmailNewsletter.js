"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useBlog } from "@/context/blogContext";
import { RiLoader4Line } from "react-icons/ri";

const EmailNewsletter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { newNewsletterRecipient } = useBlog();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubscribe = async () => {
    setLoading(true);

    try {
      // Validate name
      if (name.trim().length < 3) {
        toast.error("Invalid Name", {
          description: "Name must be at least 3 characters long.",
        });
        setLoading(false);
        return;
      }

      // Validate email
      if (!validateEmail(email)) {
        toast.error("Invalid Email", {
          description: "Please enter a valid email address.",
        });
        setLoading(false);
        return;
      }

      const response = await newNewsletterRecipient(name, email);

      if (response === "Subscribed successfully") {
        toast.success("Subscription Successful", {
          description: "You have been subscribed to the newsletter.",
        });
        setName("");
        setEmail("");
      } else {
        toast.error("Subscription Failed", {
          description: response || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Card className="shadow-lg md:w-3/4">
        <CardHeader className="space-y-2">
          <CardTitle className="text-lg lg:text-xl font-semibold">
            Email Newsletter
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Subscribe to email newsletter to get the latest updates straight to
            your inbox.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col lg:gap-3">
          <Input
            type="text"
            placeholder="Enter your name"
            className="w-full border-2 py-4 px-5 text-base"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Enter your email"
            className="w-full border-2 py-4 px-5 text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {loading ? (
            <Button
              disabled
              className="w-full md:w-auto px-6 py-3 mt-4 flex items-center gap-2"
            >
              <RiLoader4Line className="animate-spin" />
              Subscribing
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full md:w-auto px-6 py-3 mt-4"
              onClick={handleSubscribe}
            >
              Subscribe
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailNewsletter;
