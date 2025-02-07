"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Dashboard from "./Dashboard";
import { useAdminAuth } from "@/context/adminAuthContext";

export default function Page() {
  const { admin, loading } = useAdminAuth();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!admin) {
    router.push("/admin/login");
  }

  return (
    <div>
      <Dashboard adminProfile={admin} />
    </div>
  );
}
