import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className="mt-2 text-lg">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/">
        <Button className="mt-4">Go back to Home</Button>
      </Link>
    </section>
  );
};

export default NotFound;
