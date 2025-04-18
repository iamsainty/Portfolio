"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserAuth } from "@/context/user/authContext";
import React, { useEffect, useState } from "react";

const EditName = () => {
  const { user, editname } = useUserAuth();
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleSave = async () => {
    if (name.length < 3) {
      setError("Name must be at least 3 characters long");
    }
    try {
      const response = await editname(name);
      if (response !== "User updated successfully") {
        setError(response);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (!user) {
    return (
      <section className="flex flex-col gap-10">
        <div className="md:w-1/2 flex flex-col gap-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-4 w-full max-w-sm" />
        </div>

        <div className="md:w-1/2 flex flex-col gap-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-8 w-28 mt-2" />
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-10">
      <div className="md:w-1/2 flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Edit Name</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This is your display name and will be shown on your public profile,
          blog comments, and other user-facing areas.
        </p>
      </div>

      <div className="md:w-1/2 flex flex-col gap-3">
        <label htmlFor="name" className="text-sm font-medium">
          Display Name
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your display name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-muted"
        />
        <Button onClick={handleSave} className="self-start mt-2">
          Save Changes
        </Button>
        {error && (
          <p className="text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-md mt-2 w-fit">
            {error}
          </p>
        )}
      </div>
    </section>
  );
};

export default EditName;
