"use client"

import { useState } from "react";
import Image from "next/image";
import { blogCoverUpload } from "@/service/uploadToAWS";

export default function Hello() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);
    try {
      const url = await blogCoverUpload(file);
      setImageUrl(url);
      alert("Upload successful!");
    } catch (error) {
      alert("Upload failed. Check the console for details.");
    }
    setUploading(false);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {imageUrl && (
        <div>
          <p>Uploaded Image URL:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {imageUrl}
          </a>
          <Image src={imageUrl} alt="Uploaded" style={{ width: 200, marginTop: 10 }} />
        </div>
      )}
    </div>
  );
}
