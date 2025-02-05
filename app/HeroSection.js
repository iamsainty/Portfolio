import { Button } from "@/components/ui/button";
import React from "react";
import { IoIosCode } from "react-icons/io";
import { RxReader } from "react-icons/rx";

const HeroSection = () => {
  return (
    <header className="min-h-[80vh] mb-[5vh] mx-5 flex flex-col justify-center items-center gap-10 px-4 text-center">
      <h2 className="text-base lg:text-3xl font-medium">
        Welcome, I&apos;m glad you&apos;re here.
      </h2>

      <h1 className="font-extrabold font-sans text-4xl md:text-6xl lg:text-8xl dark:bg-gradient-to-t dark:from-neutral-500 dark:via-neutral-200 dark:to-white dark:text-transparent dark:bg-clip-text">
        &lt;Hey Sainty/&gt;
      </h1>

      <p className="text-lg sm:text-xl lg:text-2xl max-w-2xl">
        Sometimes I learn to code, other times I write to share what I learned.
      </p>

      <nav aria-label="Primary">
        <ul className="flex w-full flex-col sm:flex-row gap-4">
          <li>
            <Button className="flex w-full items-center gap-2 px-5 py-3 text-md lg:text-lg">
              <IoIosCode className="text-xl" />
              View Projects
            </Button>
          </li>
          <li>
            <Button
              variant="outline"
              className="flex items-center w-full gap-2 px-5 py-3 text-md lg:text-lg border border-black dark:border-white"
            >
              <RxReader className="text-xl" />
              Read Blogs
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeroSection;
