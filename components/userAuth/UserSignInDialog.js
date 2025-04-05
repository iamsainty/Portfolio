"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useUserAuth } from "@/context/user/authContext";
import { LuLoaderCircle } from "react-icons/lu";

const UserSignInDialog = ({ open, setOpen, setSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { googleAuth, loading, error, signInEmailPass } = useUserAuth();

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

  const handleSignIn = async () => {
    try {
      await signInEmailPass(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90vw] lg:max-w-[50vw] min-h-[55vh] border border-muted-foreground rounded-xl p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
            {/* Left Section */}
            <div className="flex items-center justify-center lg:w-1/2 px-4">
              <div className="text-center space-y-3">
                <DialogTitle className="text-xl lg:text-2xl font-semibold">
                  Welcome Back
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Sign in to continue where you left off.
                </p>
              </div>
            </div>

            {/* Right Section (Sign-In Form) */}
            <div className="flex flex-col w-full lg:w-1/2 gap-5">
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
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 w-full py-3 border border-muted-foreground rounded-lg hover:bg-muted transition"
                onClick={handleGoogleAuth}
              >
                <FcGoogle size={20} />
                <span className="text-sm">Sign in with Google</span>
              </Button>

              {/* Sign Up Link */}
              <p className="text-xs text-center text-muted-foreground">
                Don’t have an account?{" "}
                <span
                  className="text-primary hover:underline cursor-pointer transition"
                  onClick={() => {
                    setOpen(false);
                    setSignUp(true);
                  }}
                >
                  Sign up
                </span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserSignInDialog;
