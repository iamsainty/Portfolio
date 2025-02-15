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
import UserSignUpDialog from "./userAuth/UserSignUpDialog";
import UserSignInDialog from "./userAuth/UserSignInDialog";

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
        <DropdownMenuContent className="mr-8 mt-4 border border-muted-foreground ">
          <DropdownMenuLabel>Access your account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-muted-foreground" />
          <div className="flex flex-col gap-1 items-start my-2">
            <DropdownMenuItem asChild>
              <div className="flex justify-center w-full hover:bg-muted-foreground">
                <UserSignInDialog />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <div className="flex justify-center w-full hover:bg-muted-foreground">
                <UserSignUpDialog />
              </div>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
