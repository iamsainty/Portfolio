"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  return (
    <section className="m-12 flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-semibold">Edit Profile Picture</h2>
        <p className="text-sm text-muted-foreground">
          Update your profile picture — make it truly yours.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Image
          src={profilePicture}
          alt="Profile Picture"
          width={150}
          height={150}
          className="rounded-2xl cursor-pointer hover:brightness-50 transition"
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
        <Button onClick={handleUpload} className="w-fit">
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

export default EditProfilePicture;
