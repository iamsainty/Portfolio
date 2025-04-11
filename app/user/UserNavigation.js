"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { useUserAuth } from "@/context/user/authContext";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Toggle } from "@/components/ui/toggle";

const navLinks = [
  {
    title: "My Profile",
    link: "/user/profile",
    icon: <MdDashboard size={20} />,
  },
  {
    title: "Edit Profile",
    link: "/user/edit-profile",
    icon: <FaUserEdit size={20} />,
  },
  {
    title: "Notifications",
    link: "/user/notification",
    icon: <IoIosNotifications size={20} />,
  },
  {
    title: "Log out",
    icon: <PiSignOutBold size={20} />,
    action: "logout",
  },
];

const UserNavigation = () => {
  const pathname = usePathname();

  const { user } = useUserAuth();

  const handleLogout = () => {
    try {
      document.cookie =
        "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full lg:w-1/5">
      <aside className="sticky top-24 w-full h-[75vh] pl-14 pt-10 hidden lg:flex">
        <nav className="space-y-6 w-full flex flex-col gap-6">
          <div className="mb-4 space-y-2">
            <p className="text-lg text-muted-foreground">Welcome </p>
            <h2 className="text-3xl font-bold">
              {user?.name?.split(" ")[0] || "Friend"}
            </h2>
          </div>

          <ul className="space-y-3">
            {navLinks.map(({ title, link, icon, action }) => {
              const isActive = pathname.startsWith(link);

              if (action === "logout") {
                return (
                  <li key="logout">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-600 w-full text-left"
                    >
                      {icon}
                      <span>{title}</span>
                    </button>
                  </li>
                );
              }

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
      <ScrollArea className="lg:hidden w-full rounded-md border p-4">
        <ul className="flex gap-4">
          {navLinks.map(({ title, link, icon, action }) => {
            const isActive = pathname.startsWith(link);

            if (action === "logout") {
              return (
                <li key="logout" className="list-none">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg transition whitespace-nowrap  hover:bg-gray-200 dark:hover:bg-gray-600 w-full text-left"
                  >
                    {title}
                  </button>
                </li>
              );
            }

            return (
              <li key={title} className="list-none">
                <Link
                  href={link}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition whitespace-nowrap ${
                    isActive
                      ? "bg-gray-300 dark:bg-gray-700"
                      : "hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default UserNavigation;
