"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useUserAuth } from "@/context/user/authContext";
import { LuLoaderCircle } from "react-icons/lu";

const UserSignUpDialog = ({ open, setOpen, setSignIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(null);
  const [otpReceived, setOtpReceived] = useState("");
  const [dialog, setDialog] = useState("signUp");
  const [error, setError] = useState(null);
  const { googleAuth, loading, signUpEmailPass, checkAccount, sendSignUpOtp } =
    useUserAuth();

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

  const handleSignUpRequest = async () => {
    try {
      if (!name.trim()) {
        setError("Name cannot be empty");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      if (password.length < 6 || password.length > 10) {
        setError("Password must be 6-10 characters long.");
        return;
      }

      const message = await checkAccount(email);

      if (message === "No account associated with this email.") {
        try {
          const response = await sendSignUpOtp(name, email);
          if (response != "OTP has been sent") {
            setError(response);
            return;
          }
          setDialog("verifyOtp");
        } catch (otpError) {
          console.error("Error sending OTP:", otpError);
          setError("Failed to send OTP. Please try again.");
        }
      } else {
        setError(message);
      }
    } catch (error) {
      console.error("Signup request error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleSignUp = async () => {
    try {
      const message = await signUpEmailPass(name, email, password, otpReceived);

      if (message === "Signup successful") {
        window.location.reload();
      } else {
        setError(message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setError("Something went wrong");
    }
  };

  const resendOtp = async () => {
    try {
      const response = await sendSignUpOtp(name, email);
      if (response != "OTP has been sent") {
        setError(response);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Please try again.");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90vw] lg:max-w-[50vw] min-h-[55vh] border border-muted-foreground rounded-xl p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
            {/* Left Section - Sign-Up Message */}
            <div className="flex items-center justify-center lg:w-1/2 px-4">
              <div className="text-center space-y-3">
                <DialogTitle className="text-xl lg:text-2xl font-semibold">
                  {dialog === "signUp" ? "Join now" : "Verify OTP"}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {dialog === "signUp"
                    ? "Create an account to get started"
                    : "Enter the OTP sent to your email"}
                </p>
              </div>
            </div>

            {/* Right Section - Sign-Up Form */}
            <div className="flex flex-col w-full lg:w-1/2 gap-5">
              {dialog === "signUp" ? (
                <>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Name"
                    className="py-3 px-4 text-sm border rounded-lg"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError(null);
                    }}
                  />

                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="py-3 px-4 text-sm border rounded-lg"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                  />

                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="py-3 px-4 text-sm border rounded-lg"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(null);
                    }}
                  />
                </>
              ) : (
                <div className="flex w-full justify-center">
                  <InputOTP
                    maxLength={4}
                    value={otpReceived}
                    onChange={(value) => {
                      if (/^\d*$/.test(value)) setOtpReceived(value);
                    }}
                  >
                    <InputOTPGroup className="w-full flex gap-3">
                      {[0, 1, 2, 3].map((index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="border border-muted-foreground rounded-md"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              {loading ? (
                <>
                  <Button className="w-full py-3 rounded-lg text-[15px] font-medium shadow-md">
                    <LuLoaderCircle className="animate-spin" />
                  </Button>
                </>
              ) : (
                <>
                  {dialog === "signUp" ? (
                    <>
                      <Button
                        className="w-full py-3 rounded-lg text-[15px] font-medium shadow-md"
                        onClick={handleSignUpRequest}
                      >
                        Sign Up
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="w-full py-3 rounded-lg text-[15px] font-medium shadow-md"
                        onClick={handleSignUp}
                      >
                        Verify OTP
                      </Button>
                    </>
                  )}
                </>
              )}

              {dialog === "signUp" ? (
                <>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center gap-2 w-full py-3 border border-muted-foreground rounded-lg hover:bg-muted transition"
                    onClick={handleGoogleAuth}
                  >
                    <FcGoogle size={20} />
                    <span className="text-sm">Sign up with Google</span>
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Already have an account?{" "}
                    <span
                      className="text-primary hover:underline cursor-pointer transition"
                      onClick={() => {
                        setOpen(false);
                        setSignIn(true);
                      }}
                    >
                      Sign in
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs text-center text-muted-foreground">
                    Didn’t receive ?{" "}
                    <span
                      className="text-primary hover:underline cursor-pointer transition"
                      onClick={resendOtp}
                    >
                      Resend OTP
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserSignUpDialog;
