"use client";

import * as React from "react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUserCircle } from "react-icons/fa";

export function UserAccount() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="h-[40px] w-[40px] md:h-[50px] md:w-[50px] md:fixed md:right-12 md:border border-black dark:border-white md:rounded-full flex items-center justify-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="focus:outline-none focus:ring-0 focus-visible:ring-0 flex items-center justify-center w-full h-full">
          <FaUserCircle size={28} className="hidden md:flex" />
          <FaUserCircle size={20} className="md:hidden" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Access your account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Sign in</DropdownMenuItem>
          <DropdownMenuItem>Sign up</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
