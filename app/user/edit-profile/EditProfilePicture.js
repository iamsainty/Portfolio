"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserAuth } from "@/context/user/authContext";
import { uploadUserProfilePicture } from "@/service/uploadToAWS";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const EditProfilePicture = () => {
  const { user, editProfilePicture } = useUserAuth();
  const [file, setFile] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.profilePicture) {
      setProfilePicture(user.profilePicture);
    }
  }, [user]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith("image/")) {
      setFile(selected);
      setProfilePicture(URL.createObjectURL(selected));
      setError(null);
    } else {
      setError("Please select a valid image file.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an image to upload.");
      return;
    }

    try {
      const imageUrl = await uploadUserProfilePicture(
        file,
        user.name,
        user.email
      );

      if (!imageUrl) {
        setError("Failed to upload image.");
        return;
      }
      const response = await editProfilePicture(imageUrl);
      if (response !== "Profile picture updated successfully") {
        setError(response);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) {
    return (
      <section className="flex flex-col gap-8">
        <div className="md:w-1/2 flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">
            <Skeleton className="h-6 w-1/3" />
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <Skeleton className="h-4 w-3/4" />
          </p>
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-[150px] w-[150px] rounded-2xl" />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="md:w-1/2 flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Edit Profile Picture</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Upload a new profile picture by clicking on your current one.
        </p>
      </div>

      <div className="md:w-1/2 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Image
            src={profilePicture}
            alt="Profile Picture"
            width={150}
            height={150}
            className="rounded-2xl cursor-pointer hover:brightness-50 transition border border-muted"
            onClick={() => {
              document.getElementById("profilePictureInput")?.click();
            }}
          />
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="profilePictureInput"
          />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Button onClick={handleUpload}>Save Changes</Button>
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 px-3 py-1.5 rounded-md">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default EditProfilePicture;
