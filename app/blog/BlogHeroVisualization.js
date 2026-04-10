"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  FiTool,
  FiBriefcase,
  FiZap,
  FiLayers,
  FiFeather,
} from "react-icons/fi";

const cards = [
  {
    title: "Building Publicly",
    desc: "Projects, bugs, fixes — real dev journey",
    icon: FiTool,
    color: "text-indigo-500",
    desktop: { x: -140, y: -120, scale: 1.1, z: 4 },
  },
  {
    title: "Interview Experiences",
    desc: "Questions, rejections, what I learned",
    icon: FiBriefcase,
    color: "text-rose-500",
    desktop: { x: 160, y: -80, scale: 1.05, z: 3 },
  },
  {
    title: "DSA Practice",
    desc: "Patterns, mistakes, problem-solving",
    icon: FiZap,
    color: "text-amber-500",
    desktop: { x: -120, y: 40, scale: 0.95, z: 2 },
  },
  {
    title: "Tech Simplified",
    desc: "Concepts, tools, explained clearly",
    icon: FiLayers,
    color: "text-emerald-500",
    desktop: { x: 170, y: 50, scale: 0.95, z: 2 },
  },
  {
    title: "Dev Notes",
    desc: "Small insights that changed my thinking",
    icon: FiFeather,
    color: "text-sky-500",
    desktop: { x: 0, y: 160, scale: 0.9, z: 1 },
  },
];

const FLOAT_CONFIG = (i) => ({
  y: {
    duration: 3 + i * 0.4,
    repeat: Infinity,
    ease: "easeInOut",
  },
  scale: { duration: 0.2 },
});

export default function BlogHeroVisualization() {
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="relative w-full">
      {isMobile ? (
        <div className="relative w-full px-4 py-6 overflow-hidden">
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
        <div className="relative w-full h-[560px] flex items-center justify-center overflow-hidden">
          {/* Glow */}
          <div className="absolute w-[75%] h-[75%] bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-sky-400/20 blur-3xl rounded-full" />
          <div className="absolute w-[40%] h-[40%] bg-gradient-to-br from-indigo-400/20 via-purple-400/10 to-cyan-400/20 blur-2xl rounded-full" />

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
                className="group absolute w-[210px] px-4 py-4 rounded-2xl bg-background/85 backdrop-blur-xl border border-muted-foreground/30 shadow-[0_8px_28px_rgba(0,0,0,0.12)] cursor-pointer"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                <div className="flex items-center gap-2 mb-2">
                  <Icon
                    className={`text-sm ${card.color} transition group-hover:scale-110`}
                  />
                  <h3 className="text-sm font-semibold tracking-tight">
                    {card.title}
                  </h3>
                </div>

                <div className="h-px bg-border/40 mb-2" />
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
