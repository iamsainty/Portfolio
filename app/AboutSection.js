import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socialHandles = [
  {
    platform: "Instagram",
    link: "https://www.instagram.com/iam__sainty/",
    icon: <FaInstagram />,
  },
  {
    platform: "LinkedIn",
    link: "https://www.linkedin.com/in/iamsainty/",
    icon: <FaLinkedin />,
  },
  {
    platform: "Twitter (X)",
    link: "https://twitter.com/iam__sainty",
    icon: <FaXTwitter />,
  },
  {
    platform: "GitHub",
    link: "https://github.com/iamsainty",
    icon: <FaGithub />,
  },
];

const AboutSection = () => {
  return (
    <section className="mx-5 w-[85vw] lg:w-[75vw] flex flex-col justify-evenly items-center gap-16 lg:h-[80vh]">
      <h2 className="font-bold lg:font-extrabold text-2xl sm:text-3xl lg:text-4xl text-center">
        Get to Know Me
      </h2>
      <div className="flex flex-col lg:flex-row lg:items-center gap-12">
        <div className="w-full lg:w-1/3 flex flex-col items-center gap-6">
          <Image
            src={
              "https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/heroImage-heysainty.png"
            }
            alt="Hey Sainty - Priyanshu Chaurasiya"
            width={200}
            height={200}
            className="rounded-full border border-black dark:border-white lg:w-[250px]"
          />
          <h3 className="font-semibold text-xl lg:text-2xl">
            Priyanshu Chaurasiya
          </h3>
          <div className="flex gap-4">
            {socialHandles.map((handle) => (
              <Button
                variant="outline"
                key={handle.link}
                className="p-2"
                href={handle.link}
                target="_blank"
              >
                {handle.icon}
              </Button>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-2/3 text-center flex flex-col items-center gap-8">
          <p className="text-lg hidden lg:flex">
            I&apos;m a software developer and tech
            enthusiast. I build web applications and enjoy sharing my journey
            through blogs about technology, lifestyle, tutorials, and my
            personal learnings.
          </p>
          <p className="lg:hidden text-md">
            I&apos;m a tech enthusiast and web developer.
            I build web apps, write blogs to share my learnings.
          </p>
          <Button asChild>
            <Link href="/sainty">Know More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
