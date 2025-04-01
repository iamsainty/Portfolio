"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxReader, RxDashboard } from "react-icons/rx";
import { FaCode } from "react-icons/fa6";
import { useAdminAuth } from "@/context/adminAuthContext";

const navLinks = [
  {
    title: "Dashboard",
    link: "/admin/dashboard",
    icon: <RxDashboard size={20} />,
  },
  {
    title: "Blog",
    link: "/admin/dashboard/blog",
    icon: <RxReader size={20} />,
  },
  {
    title: "Project",
    link: "/admin/dashboard/project",
    icon: <FaCode size={20} />,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { admin } = useAdminAuth();

  return (
    <aside className="sticky top-24 w-1/5 h-[75vh] pl-14 flex pt-10">
      <nav className="space-y-6 w-full flex flex-col gap-6">
        <div className="mb-4 space-y-2">
          <p className="text-lg text-muted-foreground">Welcome</p>
          {admin?.name && (
            <h2 className="text-3xl font-bold">{admin.name.split(" ")[0]}</h2>
          )}
        </div>

        <ul className="space-y-3">
          {navLinks.map(({ title, link, icon }) => {
            const isActive = pathname === link;
            return (
              <li key={title}>
                <Link
                  href={link}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-gray-200 font-medium dark:bg-gray-800"
                      : "hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {icon}
                  <span>{title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
