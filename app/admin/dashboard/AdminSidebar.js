"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RxDashboard, RxExit } from "react-icons/rx";
import { PiArticleLight } from "react-icons/pi";
import {
  IoCodeSlashOutline,
  IoMailOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { RiMessage2Line, RiPageSeparator } from "react-icons/ri";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

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
    children: [
      { title: "New Blog", link: "/admin/dashboard/blog/newblog" },
      { title: "Blogs", link: "/admin/dashboard/blog/blogs" },
    ],
  },
  {
    title: "Comments",
    link: "/admin/dashboard/comments",
    icon: <RiMessage2Line size={20} />,
    children: [
      { title: "All Comments", link: "/admin/dashboard/comments/allcomments" },
    ],
  },
  {
    title: "Newsletter",
    link: "/admin/dashboard/newsletter",
    icon: <IoMailOutline size={20} />,
    children: [
      { title: "New Blog", link: "/admin/dashboard/newsletter/blog" },
      { title: "New Update", link: "/admin/dashboard/newsletter/update" },
    ],
  },
  {
    title: "Users",
    link: "/admin/dashboard/user",
    icon: <IoPeopleOutline size={20} />,
  },
  {
    title: "Project",
    link: "/admin/dashboard/project",
    icon: <IoCodeSlashOutline size={20} />,
    children: [
      { title: "New Project", link: "/admin/dashboard/project/newproject" },
      { title: "Projects", link: "/admin/dashboard/project/projects" },
    ],
  },
  {
    title: "Page",
    link: "/admin/dashboard/page",
    icon: <RiPageSeparator size={20} />,
    children: [
      { title: "New Page", link: "/admin/dashboard/page/newpage" },
      { title: "Pages", link: "/admin/dashboard/page/pages" },
    ],
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
        adminToken,
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
  const [activeMenu, setActiveMenu] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchAdmin = async () => {
      const admin = await getAdminProfile();
      if (!admin) {
        router.push("/admin/login");
      } else {
        setAdmin(admin);
      }
    };
    fetchAdmin();
  }, []);

  const handleLogout = () => {
    document.cookie = "adminToken=; path=/; max-age=0";
    toast.success("Logged out successfully");
    router.push("/admin/login");
  };

  const toggleMenu = (title) => {
    setActiveMenu((prev) => (prev === title ? null : title));
  };

  return (
    <aside className="sticky top-24 w-1/5 h-screen pl-14 py-10">
      <nav className="space-y-6 w-full flex flex-col">
        <div className="mb-4 space-y-2">
          <p className="text-lg text-muted-foreground">Welcome</p>
          {admin?.name ? (
            <h2 className="text-3xl font-bold">{admin.name.split(" ")[0]}</h2>
          ) : (
            <Skeleton className="w-24 h-10" />
          )}
        </div>

        <ul className="space-y-3">
          {navLinks.map(({ title, link, icon, children }) => {
            const isExact = pathname === "/admin/dashboard";
            const isActive =
              link === "/admin/dashboard" ? isExact : pathname.startsWith(link);
            const isOpen = activeMenu === title;

            return (
              <li key={title}>
                <button
                  onClick={() =>
                    children ? toggleMenu(title) : router.push(link)
                  }
                  className={`flex items-center gap-3 px-4 py-2 w-full text-left rounded-lg transition ${
                    isActive
                      ? "font-medium bg-muted-foreground/25"
                      : "hover:bg-muted"
                  }`}
                >
                  {icon}
                  <span>{title}</span>
                </button>
                {isOpen && children && (
                  <ul className="pl-5 pt-1 space-y-1">
                    {children.map((child) => (
                      <li key={child.link}>
                        <Link
                          href={child.link}
                          className="block px-4 py-2 my-1 w-full text-left text-sm rounded-lg transition hover:bg-muted"
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
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
