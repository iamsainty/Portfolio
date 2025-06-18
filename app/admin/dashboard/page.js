"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Dashboard from "./Dashboard";

async function getAdminProfile() {
  try {
    const adminToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("adminToken="))
      ?.split("=")[1];

    if (!adminToken) {
      toast.error("No admin token found");
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
      toast.error("Error fetching admin profile");
      return null;
    }

    return data.admin;
  } catch (error) {
    toast.error("Error fetching admin profile");
    return null;
  }
}

export default function Page() {
  const [admin, setAdmin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const admin = await getAdminProfile();
      if (admin === null) {
        router.push("/admin/login");
      } else {
        setAdmin(admin);
      }
    };

    fetchAdminProfile();
  }, []);

  return (
    <div>
      <Dashboard adminProfile={admin} />
    </div>
  );
}
