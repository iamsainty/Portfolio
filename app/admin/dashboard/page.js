import { cookies } from "next/headers";
import React from "react";
import Dashboard from "./Dashboard";

async function getAdminProfile(adminToken) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/adminprofile`,
    {
      method: "GET",
      headers: {
        adminToken: adminToken, // Ensure it's a valid string
        "Content-Type": "application/json",
      },
    }
  );
  
  const status = response.status;
  const data = await response.json();

  return { status, data };
}

export default async function Page() {
  const cookiesStore = await cookies();
  const adminToken = cookiesStore.get("adminToken")?.value; // No `await` needed

  const adminProfile = await getAdminProfile(adminToken);

  return (
    <div>
      <Dashboard adminProfile={adminProfile.data} status={adminProfile.status} />
    </div>
  );
}
