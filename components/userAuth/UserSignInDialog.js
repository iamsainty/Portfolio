import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import UserSignUpDialog from "./UserSignUpDialog";

const UserSignInDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="rounded-lg text-center">Sign in</DialogTrigger>

      <DialogContent className="w-[90vw] lg:max-w-[50vw] min-h-[55vh] border border-muted-foreground rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
          {/* Left Section */}
          <div className="flex items-center justify-center lg:w-1/2 px-4">
            <div className="text-center space-y-3">
              <h2 className="text-xl lg:text-2xl font-semibold">
                Welcome Back
              </h2>
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
            />

            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="py-3 px-4 text-sm border rounded-lg"
            />

            <Button className="w-full py-3 rounded-lg text-[15px] font-medium shadow-md">
              Sign In
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 w-full py-3 border border-muted-foreground rounded-lg hover:bg-muted transition"
            >
              <FcGoogle size={20} />
              <span className="text-sm">Sign in with Google</span>
            </Button>

            {/* Sign Up Link */}
            <p className="text-xs text-center text-muted-foreground">
              Don’t have an account?{" "}
              <span className="text-primary hover:underline cursor-pointer transition">
                <UserSignUpDialog />
              </span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserSignInDialog;
