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
import { useUserAuth } from "@/context/user/authContext";
import Image from "next/image";
import { LuLoaderCircle } from "react-icons/lu";
import Link from "next/link";

export function UserAccount() {
  const [open, setOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const { user, loading } = useUserAuth();

  const handleLogout = () => {
    try {
      // delete userToken cookie
      document.cookie = `userToken=${null}`;
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div
        className="h-[40px] w-[40px] md:h-[50px] md:w-[50px] md:fixed md:right-12 md:border border-black dark:border-white md:rounded-full flex items-center justify-center"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <DropdownMenu open={open}>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-0 focus-visible:ring-0 flex items-center justify-center w-full h-full">
            {loading ? (
              <>
                <LuLoaderCircle className="animate-spin" />
              </>
            ) : (
              <>
                {user ? (
                  <div className="w-[24px] h-[24px] md:w-[34px] md:h-[34px] rounded-full overflow-hidden">
                    <Image
                      src={user.profilePicture}
                      alt="profile picture"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                ) : (
                  <>
                    <FaUserCircle size={30} className="hidden md:flex" />
                    <FaUserCircle size={20} className="md:hidden" />
                  </>
                )}
              </>
            )}
          </DropdownMenuTrigger>
          {!loading && (
            <DropdownMenuContent className="mr-8 mt-4 border border-muted-foreground ">
              {user ? (
                <>
                  <DropdownMenuLabel>Manage your account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-muted-foreground" />
                  <Link href="/user/profile">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel>Access your account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-muted-foreground" />
                  <DropdownMenuItem onSelect={() => setShowSignIn(true)}>
                    Sign In
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setShowSignUp(true)}>
                    Sign Up
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>

      <UserSignInDialog open={showSignIn} setOpen={setShowSignIn} setSignUp={setShowSignUp} />
      <UserSignUpDialog open={showSignUp} setOpen={setShowSignUp} setSignIn={setShowSignIn} />
    </>
  );
}
