import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const profileLinks = [
  {
    idx: 1,
    platform: "Linkedin",
    link: "https://www.linkedin.com/in/iamsainty/",
    icon: <FaLinkedin />,
  },
  {
    idx: 2,
    platform: "Twitter (X)",
    link: "https://twitter.com/iam__sainty",
    icon: <FaXTwitter />,
  },
  {
    idx: 3,
    platform: "Instagram",
    link: "https://www.instagram.com/iam__sainty/",
    icon: <FaInstagram />,
  },
  {
    idx: 4,
    platform: "Github",
    link: "https://github.com/iamsainty",
    icon: <FaGithub />,
  },
  {
    idx: 5,
    platform: "LeetCode",
    link: "https://leetcode.com/iamsainty/",
    icon: <SiLeetcode />,
  },
];

const HeroSection = () => {
  return (
    <section
      className="container mx-auto px-6 min-h-[86vh] w-full flex items-center overflow-hidden"
      id="herosection"
    >
      <div className="grid md:grid-cols-2 gap-4 lg:gap-10 w-full items-center justify-center">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4 lg:gap-7 text-center lg:text-left max-w-xl">
          <p className="text-sm tracking-widest uppercase text-muted-foreground">
            Welcome to
          </p>

          <h1 className="font-thin text-5xl lg:text-7xl tracking-wider text-foreground">
            HEY SAINTY
          </h1>

          <p className="text-sm font-medium md:text-md lg:text-lg text-foreground/70 leading-relaxed max-w-lg">
            I build real-world projects, solve problems, and share about my
            learnings and technical insights through blogs
          </p>

          {/* profile links, Linkedin, Twitter, Instagram, Github, leetcode */}
          <div className="hidden lg:flex flex-row gap-3 pt-2">
            {profileLinks.map((link) => (
              <Link
                key={link.idx}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="group"
              >
                <Button
                  variant="outline"
                  className="flex items-center justify-center px-3 rounded-full overflow-hidden transition-all duration-300 ease-out hover:bg-muted border border-muted-foreground/50"
                >
                  {/* Icon */}
                  <span className="text-xl flex-shrink-0 transform transition-all duration-300 group-hover:-translate-x-1 pl-1 group-hover:pl-0 group-hover:rotate-12">
                    {link.icon}
                  </span>

                  {/* Text */}
                  <span className="max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 transition-all duration-300 ease-out whitespace-nowrap overflow-hidden">
                    {link.platform}
                  </span>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex lg:hidden justify-center gap-3 pt-4">
          {profileLinks.map((link) => (
            <Link
              key={link.idx}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.platform}
              className="group"
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border border-muted-foreground/40"
              >
                {link.icon}
              </Button>
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          {/* Background Glow */}
          <div className="absolute w-[60%] h-[60%] bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-sky-400/20 blur-3xl rounded-full" />
          <div className="absolute w-[40%] h-[40%] bg-gradient-to-br from-indigo-400/30 via-purple-400/20 to-cyan-400/20 blur-2xl rounded-full" />

          {/* Avatar */}
          <div className="relative">
            <Image
              src="https://hey-sainty.s3.ap-south-1.amazonaws.com/hey-sainty-assets/priyanshu-avatar.png"
              alt="Priyanshu Chaurasiya"
              width={420}
              height={420}
              className="object-cover w-[250px] lg:w-[420px] drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
