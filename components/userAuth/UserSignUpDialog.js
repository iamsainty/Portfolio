import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import UserSignInDialog from "./UserSignInDialog";

const UserSignUpDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="rounded-lg text-center">Sign up</DialogTrigger>

      <DialogContent className="w-[90vw] lg:max-w-[50vw] min-h-[55vh] border border-muted-foreground rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
          {/* Left Section - Sign-Up Message */}
          <div className="flex items-center justify-center lg:w-1/2 px-4">
            <div className="text-center space-y-3">
              <h2 className="text-xl lg:text-2xl font-semibold">Join now</h2>
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
            />

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
              Sign Up
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 w-full py-3 border border-muted-foreground rounded-lg hover:bg-muted transition"
            >
              <FcGoogle size={20} />
              <span className="text-sm">Sign up with Google</span>
            </Button>

            {/* Sign In Link */}
            <p className="text-xs text-center text-muted-foreground">
              Already have an account?{" "}
              <span className="text-primary hover:underline cursor-pointer transition">
                <UserSignInDialog />
              </span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserSignUpDialog;
