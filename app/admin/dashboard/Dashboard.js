"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Dashboard = ({ adminProfile, status }) => {
  const router = useRouter();

  useEffect(() => {
    if (status !== 200) {
      router.replace("/admin/login");
    }
  }, [status, router]);

  if (status !== 200) {
    return null;
  }

  return (
  <div>
    <Button>Project</Button>
  </div>
);
};

export default Dashboard;
