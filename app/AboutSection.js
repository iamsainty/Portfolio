"use client";

import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import {
  FiCode,
  FiGithub,
  FiEdit,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

const cards = [
  {
    title: "1900+",
    desc: "Contest Rating on LeetCode (Top 4% globally)",
    icon: FiCode,
    color: "text-amber-500",
    desktop: { x: -140, y: -120, scale: 1.1, z: 4 },
  },
  {
    title: "30+",
    desc: "Projects & GitHub Repositories",
    icon: FiGithub,
    color: "text-indigo-500",
    desktop: { x: 160, y: -80, scale: 1.05, z: 3 },
  },
  {
    title: "25+",
    desc: "Technical Blogs with 750+ average views",
    icon: FiEdit,
    color: "text-sky-500",
    desktop: { x: -120, y: 40, scale: 0.95, z: 2 },
  },
  {
    title: "10000+",
    desc: "Annual pageview on my platform",
    icon: FiTrendingUp,
    color: "text-emerald-500",
    desktop: { x: 170, y: 50, scale: 0.95, z: 2 },
  },
  {
    title: "50+",
    desc: "Registered users on my platform",
    icon: FiUsers,
    color: "text-rose-500",
    desktop: { x: 0, y: 160, scale: 0.9, z: 1 },
  },
];

const FLOAT_CONFIG = (i) => ({
  y: {
    duration: 3 + i * 0.4,
    repeat: Infinity,
    ease: "easeInOut",
  },
});

const AboutSection = () => {
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      className="container mx-auto lg:max-w-6xl px-6 min-h-[86vh] w-full flex items-center overflow-hidden"
      id="aboutsection"
    >
      <div className="grid lg:grid-cols-2 gap-4 lg:gap-10 h w-full items-center justify-center">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-5 lg:gap-7 text-center lg:text-left max-w-xl">
          {/* Label */}
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
            About Me
          </p>

          {/* Heading */}
          <h2 className="font-thin text-2xl lg:text-4xl tracking-wider text-foreground">
            <span className="text-muted-foreground">I&apos;m a </span>
            <span className="text-primary">
              <TypeAnimation
                sequence={[
                  "Software Developer",
                  1800,
                  "Problem Solver",
                  1800,
                  "Technical Writer",
                  1800,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            </span>
          </h2>

          {/* Description */}
          <p className="text-xs font-medium lg:text-md lg:text-lg text-foreground/70 leading-relaxed max-w-lg">
            I&apos;m focused on building scalable applications, solving
            real-world problems, and sharing my learnings through blogs and
            projects with you all.
          </p>
        </div>

        {/* RIGHT SIDE */}

        {isMobile ? (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <div className="absolute w-[50vw] h-[50vh] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-sky-400/20 blur-3xl rounded-full" />
            <div className="absolute w-[30vw] h-[30vh] bottom-[50%] right-[50%] translate-x-1/2 translate-y-1/2 bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-cyan-400/20 blur-2xl rounded-full" />

            {/* 📱 Cards */}
            <div className="relative flex flex-col gap-3">
              {cards.map((card, i) => {
                const Icon = card.icon;

                return (
                  <motion.div
                    key={i}
                    whileTap={{ scale: 0.96 }}
                    className="relative w-full p-4 rounded-2xl bg-background/85 backdrop-blur-xl border border-muted-foreground/30 shadow-md"
                  >
                    {/* subtle gradient overlay (same as desktop) */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                    <div className="flex items-center gap-3 mb-1">
                      <Icon className={`text-sm ${card.color}`} />
                      <h3 className="text-sm font-semibold tracking-tight">
                        {card.title}
                      </h3>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {card.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          /* 💻 DESKTOP FLOATING LAYOUT */
          <div className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Glow */}
            <div className="absolute w-[60%] h-[60%] bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-sky-400/20 blur-3xl rounded-full" />
            <div className="absolute w-[40%] h-[40%] bg-gradient-to-br from-indigo-400/30 via-purple-400/20 to-cyan-400/20 blur-2xl rounded-full" />

            {cards.map((card, i) => {
              const Icon = card.icon;
              const pos = card.desktop;

              return (
                <motion.div
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  initial={{
                    x: pos.x,
                    y: pos.y,
                    scale: pos.scale,
                  }}
                  animate={{
                    y: [pos.y, pos.y - 8, pos.y],
                    scale: active === i ? pos.scale + 0.08 : pos.scale,
                    zIndex: active === i ? 10 : pos.z,
                    opacity: active !== null && active !== i ? 0.4 : 1,
                  }}
                  transition={FLOAT_CONFIG(i)}
                  whileHover={{
                    y: pos.y - 12,
                    scale: pos.scale + 0.1,
                  }}
                  className="group absolute w-auto max-w-[180px] p-3 rounded-2xl bg-background/85 backdrop-blur-xl border border-muted-foreground/30 shadow-[0_4px_16px_rgba(0,0,0,0.12)] cursor-pointer"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                  <div className="flex items-center gap-2 mb-1">
                    <Icon
                      className={`text-xs ${card.color} transition group-hover:scale-110`}
                    />
                    <h3 className="text-xs font-semibold tracking-wider">
                      {card.title}
                    </h3>
                  </div>

                  <div className="h-px bg-border/40 mb-1" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
