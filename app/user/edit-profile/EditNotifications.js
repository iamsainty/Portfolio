"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useUserAuth } from "@/context/user/authContext";
import { useUserEditProfile } from "@/context/user/profileEditContext";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { RiLoader4Line } from "react-icons/ri"; // ✅ Import the spinner

const EditNotifications = () => {
  const { user } = useUserAuth();
  const { editNotificationPreferences } = useUserEditProfile();
  const [newBlogEmail, setNewBlogEmail] = useState(true);
  const [accountUpdateEmail, setAccountUpdateEmail] = useState(true);
  const [loading, setLoading] = useState(false); // ✅ Loading state

  useEffect(() => {
    if (user) {
      setNewBlogEmail(user.emailPreferences.newBlogs);
      setAccountUpdateEmail(user.emailPreferences.accountActivity);
    }
  }, [user]);

  const handleSaveChanges = async () => {
    setLoading(true); // ✅ Start loading
    try {
      const response = await editNotificationPreferences(
        newBlogEmail,
        accountUpdateEmail
      );

      if (response !== "Preferences updated successfully") {
        toast.error("Failed to update", {
          description: response || "Please try again later.",
        });
      } else {
        toast.success("Preferences updated", {
          description:
            "Your notification preferences were updated successfully.",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Could not update preferences. Please try again.",
      });
    } finally {
      setLoading(false); // ✅ End loading
    }
  };

  if (!user)
    return (
      <section className="flex flex-col gap-12">
        <div className="space-y-1.5">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="space-y-5 md:w-1/2">
          <Skeleton className="h-5 w-40" />

          <div className="flex items-center justify-between border rounded-md px-4 py-3 shadow-sm bg-muted/30">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>

          <div className="flex items-center justify-between border rounded-md px-4 py-3 shadow-sm bg-muted/30">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
        </div>

        <Skeleton className="h-10 w-32 mt-4" />
      </section>
    );

  return (
    <section className="flex flex-col gap-12">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold">Notification Preferences</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Choose what kind of notifications you would like to receive.
        </p>
      </div>

      <div className="space-y-5 md:w-1/2">
        <h4 className="text-base md:text-lg font-medium">
          Email Notifications
        </h4>

        <div className="flex items-center justify-between border rounded-md px-4 py-3 shadow-sm bg-muted/50 transition hover:bg-muted/40">
          <span className="text-sm font-medium">New Blog Posts</span>
          <Switch
            checked={newBlogEmail}
            onCheckedChange={() => setNewBlogEmail(!newBlogEmail)}
            aria-label="Toggle new blog post notifications"
          />
        </div>

        <div className="flex items-center justify-between border rounded-md px-4 py-3 shadow-sm bg-muted/50 transition hover:bg-muted/40">
          <span className="text-sm font-medium">Account Updates</span>
          <Switch
            checked={accountUpdateEmail}
            onCheckedChange={() => setAccountUpdateEmail(!accountUpdateEmail)}
            aria-label="Toggle account update notifications"
          />
        </div>
      </div>

      {loading ? (
        <Button disabled className="self-start mt-2 flex items-center gap-2">
          <RiLoader4Line className="animate-spin" />
          Saving
        </Button>
      ) : (
        <Button
          onClick={handleSaveChanges}
          className="self-start mt-2 flex items-center gap-2"
        >
          Save Changes
        </Button>
      )}
    </section>
  );
};

export default EditNotifications;
