"use client";

import { useEffect, useState } from "react";
import { useBlog } from "@/context/blogContext";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("recipientId");
  const router = useRouter();
  const { getRecipient, newsletterUnsubscribe, newsletterResubscribe } =
    useBlog();

  const [recipient, setRecipient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  const reasons = [
    "I receive too many emails.",
    "The content isn't relevant anymore.",
    "I've found a better source.",
    "I subscribed by mistake.",
    "I don't have time to read them.",
  ];

  useEffect(() => {
    if (!recipientId) {
      router.replace("/");
      return;
    }

    const fetchRecipient = async () => {
      const response = await getRecipient(recipientId);
      if (!response || response.message !== "Recipient found successfully.") {
        router.replace("/");
      } else {
        setRecipient(response.recipient);
      }
      setLoading(false);
    };

    fetchRecipient();
  }, [recipientId, getRecipient, router]);

  const handleUnsubscribe = async () => {
    if (!selectedReason) {
      toast.error("Please select a reason to unsubscribe.", {
        description: "Your feedback helps us improve our content.",
      });
      return;
    }

    const response = await newsletterUnsubscribe(recipientId, selectedReason);

    if (response !== "Unsubscribed successfully.") {
      toast.error("Unsubscription failed.", {
        description: "Something went wrong. Please try again later.",
      });
    } else {
      setIsUnsubscribed(true);
      toast.success("You’ve been unsubscribed.", {
        description:
          "You won’t receive future emails from us. You can resubscribe anytime.",
      });
    }
  };

  const handleResubscribe = async () => {
    const response = await newsletterResubscribe(recipientId);

    if (response !== "Resubscribed successfully.") {
      toast.error("Resubscription failed.", {
        description: "Please try again later.",
      });
    } else {
      setIsUnsubscribed(false);
      setSelectedReason("");
      toast.success("Welcome back!", {
        description: "You’re resubscribed and will receive future updates.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center mb-[10vh] max-w-[80vw] mx-auto">
        <div className="flex flex-col w-full max-w-2xl gap-6 sm:gap-7">
          <Skeleton className="h-8 w-3/4 sm:w-1/2" />
          <Skeleton className="h-6 w-5/6 sm:w-3/4" />

          <div className="flex flex-col gap-3">
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-1/2 sm:w-3/4" />
                </div>
              ))}
          </div>

          <Skeleton className="h-10 w-1/3 mt-4" />
        </div>
        /
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center mb-[10vh] max-w-[80vw] mx-auto">
      {!isUnsubscribed ? (
        <div className="flex flex-col w-full max-w-2xl gap-6 sm:gap-7">
          <h1 className="font-bold text-xl md:text-3xl leading-tight">
            Hey {recipient.name.split(" ")[0]},<br className="md:hidden" />
            we’re sorry to see you go
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
            Before you unsubscribe, we’d love to know why. Your feedback
            matters!
          </p>

          <div className="flex flex-col gap-3">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 hover:text-muted-foreground"
              >
                <Checkbox
                  id={`reason-${idx}`}
                  checked={selectedReason === reason}
                  onCheckedChange={() =>
                    setSelectedReason((prev) => (prev === reason ? "" : reason))
                  }
                />
                <label
                  htmlFor={`reason-${idx}`}
                  className="text-sm sm:text-base cursor-pointer"
                >
                  {reason}
                </label>
              </div>
            ))}
          </div>

          <Button
            className="w-fit mt-4"
            onClick={handleUnsubscribe}
            disabled={!selectedReason}
          >
            Confirm Unsubscribe
          </Button>
        </div>
      ) : (
        <div className="flex flex-col w-full max-w-2xl gap-6 sm:gap-7">
          <h1 className="font-bold text-lg sm:text-xl md:text-3xl leading-tight">
            Hey {recipient.name.split(" ")[0]}, <br className="md:hidden" />
            changed your mind?
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
            No worries — it happens! We’re happy to have you back. Stay tuned
            for updates and news.
          </p>
          <p className="text-sm">Click below to resubscribe instantly.</p>
          <Button className="w-fit mt-4" onClick={handleResubscribe}>
            Resubscribe
          </Button>
        </div>
      )}
    </div>
  );
}
