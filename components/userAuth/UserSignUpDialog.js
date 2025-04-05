"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import UserSignInDialog from "./UserSignInDialog";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useUserAuth } from "@/context/user/authContext";
import { LuLoaderCircle } from "react-icons/lu";

const UserSignUpDialog = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);
  const { googleAuth, loading, error, signUpEmailPass } = useUserAuth();

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await googleAuth(user.displayName, user.email, user.uid, user.photoURL);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUpEmailPass(name, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger
        className="rounded-lg text-center"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        Sign up
      </DialogTrigger> */}

        <DialogContent className="w-[90vw] lg:max-w-[50vw] min-h-[55vh] border border-muted-foreground rounded-xl p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
            {/* Left Section - Sign-Up Message */}
            <div className="flex items-center justify-center lg:w-1/2 px-4">
              <div className="text-center space-y-3">
                <DialogTitle className="text-xl lg:text-2xl font-semibold">
                  Join now
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Create an account to get started
                </p>
              </div>
            </div>

            {/* Right Section - Sign-Up Form */}
            <div className="flex flex-col w-full lg:w-1/2 gap-5">
              <Input
                id="name"
                type="text"
                placeholder="Name"
                className="py-3 px-4 text-sm border rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="py-3 px-4 text-sm border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="py-3 px-4 text-sm border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              {loading ? (
                <>
                  <Button className="w-full py-3 rounded-lg text-[15px] font-medium shadow-md">
                    <LuLoaderCircle className="animate-spin" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="w-full py-3 rounded-lg text-[15px] font-medium shadow-md"
                    onClick={handleSignUp}
                  >
                    Sign up
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 w-full py-3 border border-muted-foreground rounded-lg hover:bg-muted transition"
                onClick={handleGoogleAuth}
              >
                <FcGoogle size={20} />
                <span className="text-sm">Sign up with Google</span>
              </Button>

              {/* Sign In Link */}
              <p className="text-xs text-center text-muted-foreground">
                Already have an account?{" "}
                <span
                  className="text-primary hover:underline cursor-pointer transition"
                  onClick={() => {
                    setShowSignIn(true);
                  }}
                >
                  Sign in
                </span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* <UserSignInDialog open={showSignIn} setOpen={setShowSignIn} /> */}
    </>
  );
};

export default UserSignUpDialog;
