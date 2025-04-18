"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  return (
    <section className="m-12 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Edit Name</h2>
        <p className="text-sm text-muted-foreground">
          Update your display name as you’d like it to appear
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full lg:w-1/3 border border-muted"
        />
        <Button onClick={handleSave} className="w-fit">
          Save
        </Button>
      </div>
      {error && (
        <p className="text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-md w-fit">
          {error}
        </p>
      )}
    </section>
  );
};

export default EditName;
