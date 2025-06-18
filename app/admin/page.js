"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const adminToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("adminToken="));

    if (!adminToken) {
      router.push("/admin/login");
    } else {
      router.push("/admin/dashboard");
    }
  }, []);

  return <></>;
}
