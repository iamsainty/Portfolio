"use client";

import { useUserAuth } from "@/context/user/authContext";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
} from "firebase/auth";
import { useEffect } from "react";
import { toast } from "sonner";

export default function GoogleOneTap() {
  const { googleAuth } = useUserAuth();
  useEffect(() => {
    // Get Cookie Helper
    const getCookie = (name) => {
      const cookies = document.cookie.split("; ");

      for (let cookie of cookies) {
        const [key, value] = cookie.split("=");

        if (key === name) {
          return value;
        }
      }

      return null;
    };

    // Check if user already logged in
    const userToken = getCookie("userToken");

    if (userToken && userToken !== "undefined" && userToken !== "null") {
      return;
    }

    // Check declined status
    const declined = getCookie("userDeclinedGoogleOneTap");
    const declinedTime = getCookie("userDeclinedGoogleOneTapTime");

    if (declined === "true" && declinedTime) {
      const oldTime = new Date(declinedTime).getTime();

      const currentTime = new Date().getTime();

      const diffInMinutes = (currentTime - oldTime) / (1000 * 60);

      // user declined within 30 mins
      if (diffInMinutes < 30) {
        // return;
      }

      // reset cookies after 30 mins
      document.cookie = "userDeclinedGoogleOneTap=false; path=/";

      document.cookie = "userDeclinedGoogleOneTapTime=; path=/";
    }

    // Delay One Tap by 5 seconds
    const timer = setTimeout(() => {
      // check google script
      if (!window.google) {
        return;
      }

      // Initialize One Tap
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,

        callback: async (response) => {
          try {
            const credential = GoogleAuthProvider.credential(
              response.credential
            );
            const result = await signInWithCredential(auth, credential);
            const user = result.user;

            await googleAuth(
              user.displayName,
              user.email,
              user.uid,
              user.photoURL
            );
            window.location.reload();
          } catch (error) {
            console.error(error);
            toast.error("Failed to sign in with Google");
          }
        },

        cancel_on_tap_outside: false,
      });

      // Show One Tap
      window.google.accounts.id.prompt((notification) => {
        // user dismissed popup
        if (
          notification.isDismissedMoment() ||
          notification.isSkippedMoment()
        ) {
          document.cookie = "userDeclinedGoogleOneTap=true; path=/";

          document.cookie = `userDeclinedGoogleOneTapTime=${new Date().toISOString()}; path=/`;
        }
      });
    }, 2500);

    // cleanup
    return () => clearTimeout(timer);
  }, [googleAuth]);

  return null;
}
