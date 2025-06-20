"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RxDashboard, RxExit } from "react-icons/rx";
import { toast } from "sonner";
import { PiArticleLight } from "react-icons/pi";
import { IoCodeSlashOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { RiPageSeparator } from "react-icons/ri";

const navLinks = [
  {
    title: "Dashboard",
    link: "/admin/dashboard",
    icon: <RxDashboard size={20} />,
  },
  {
    title: "Blog",
    link: "/admin/dashboard/blog",
    icon: <PiArticleLight size={20} />,
  },
  {
    title: "Project",
    link: "/admin/dashboard/project",
    icon: <IoCodeSlashOutline size={20} />,
  },
  {
    title: "Pages",
    link: "/admin/dashboard/pages",
    icon: <RiPageSeparator size={20} />,
  },
];

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

export function AdminSidebar() {
  const [admin, setAdmin] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const admin = await getAdminProfile();
      if (admin === null) {
        toast.error("Login as admin to continue");
        router.push("/admin/login");
      } else {
        setAdmin(admin);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleLogout = () => {
    try {
      document.cookie = "adminToken=; path=/; max-age=0";
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch (error) {
      toast.error("Error logging out");
      console.error("Error logging out:", error);
    }
  };

  return (
    <aside className="sticky top-24 w-1/5 h-[75vh] pl-14 flex pt-10">
      <nav className="space-y-6 w-full flex flex-col gap-6">
        <div className="mb-4 space-y-2">
          <p className="text-lg text-muted-foreground">Welcome</p>
          {admin?.name ? (
            <h2 className="text-3xl font-bold">{admin.name.split(" ")[0]}</h2>
          ) : (
            <Skeleton className="w-24 h-10" />
          )}
        </div>

        <ul className="space-y-3">
          {navLinks.map(({ title, link, icon }) => {
            const isExact = pathname === "/admin/dashboard";
            const isActive =
              link === "/admin/dashboard" ? isExact : pathname.startsWith(link);
            return (
              <li key={title}>
                <Link
                  href={link}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "font-medium bg-muted-foreground/25"
                      : "hover:bg-muted"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {icon}
                  <span>{title}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 w-full rounded-lg transition hover:bg-muted"
              aria-label="Logout"
            >
              <RxExit size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
