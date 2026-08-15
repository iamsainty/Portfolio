"use client";

import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { motion } from "framer-motion";
import {
  FiTool,
  FiBriefcase,
  FiZap,
  FiLayers,
  FiFeather,
  FiCode,
  FiCpu,
  FiBookOpen,
  FiEdit3,
  FiDatabase,
  FiLayout,
  FiCloud,
} from "react-icons/fi";

const icons = {
  FiTool,
  FiBriefcase,
  FiZap,
  FiLayers,
  FiFeather,
  FiCode,
  FiCpu,
  FiBookOpen,
  FiEdit3,
  FiDatabase,
  FiLayout,
  FiCloud,
};

const cardPos = [
  {
    color: "text-indigo-500",
    desktop: { x: -140, y: -120, scale: 1.02, z: 4 },
    tablet: { x: -120, y: -110, scale: 1.05, z: 4 },
    mobile: { x: -90, y: -90, scale: 0.88, z: 5 },
  },
  {
    color: "text-rose-500",
    desktop: { x: 160, y: -80, scale: 1.05, z: 3 },
    tablet: { x: 125, y: -70, scale: 1, z: 3 },
    mobile: { x: 85, y: -55, scale: 0.86, z: 4 },
  },
  {
    color: "text-amber-500",
    desktop: { x: -120, y: 40, scale: 0.97, z: 2 },
    tablet: { x: -95, y: 30, scale: 0.92, z: 2 },
    mobile: { x: -95, y: 30, scale: 0.86, z: 3 },
  },
  {
    color: "text-emerald-500",
    desktop: { x: 170, y: 50, scale: 0.92, z: 2 },
    tablet: { x: 135, y: 50, scale: 0.92, z: 2 },
    mobile: { x: 100, y: 50, scale: 0.86, z: 2 },
  },
  {
    color: "text-sky-500",
    desktop: { x: 0, y: 160, scale: 0.96, z: 1 },
    tablet: { x: 0, y: 160, scale: 0.88, z: 1 },
    mobile: { x: 0, y: 150, scale: 0.84, z: 1 },
  },
];

const HeroSection = ({ data }) => {
  const [screen, setScreen] = useState("desktop");
  const [active, setActive] = useState(null);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) {
        setScreen("mobile");
      } else if (window.innerWidth < 1024) {
        setScreen("tablet");
      } else {
        setScreen("desktop");
      }
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  const FLOAT_CONFIG = (i) => ({
    y: {
      duration: 3 + i * 0.4,
      repeat: Infinity,
      ease: "easeInOut",
    },
    scale: { duration: 0.2 },
  });

  const today = new Date();

  const isIndependenceRepublicDay = [
    "25-01",
    "26-01",
    "27-01",
    "14-08",
    "15-08",
    "16-08",
  ].includes(
    `${String(today.getDate()).padStart(2, "0")}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}`
  );

  return (
    <section className="container mx-auto lg:max-w-6xl px-6 min-h-[80vh] w-full flex items-center overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-4 lg:gap-10 h w-full items-center justify-center">
        <div className="text-center lg:text-left">
          <Breadcrumb className="border border-border/60 px-4 py-2 rounded-full mb-6 inline-block">
            <BreadcrumbList className="text-xs md:text-sm">
              {data.breadcrumb.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {item.href ? (
                      <BreadcrumbLink href={item.href}>
                        {item.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="font-medium">
                        {item.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>

                  {index < data.breadcrumb.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col justify-center gap-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-wider">
              {isIndependenceRepublicDay ? (
                <span className="bg-gradient-to-r from-[#FF9933] via-foreground to-[#138808] bg-clip-text text-transparent">
                  {data.title}
                </span>
              ) : (
                data.title
              )}
            </h1>

            {/* Description */}
            <p className="text-xs font-medium lg:text-md lg:text-lg text-foreground/70 leading-relaxed max-w-lg">
              {data.description}
            </p>
          </div>
        </div>
        <div className="relative w-full min-h-[50vh] md:min-h-[65vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute w-[60%] h-[60%] bg-gradient-to-r from-indigo-500/30 via-purple-500/20 to-sky-400/20 blur-3xl rounded-full" />
          <div className="absolute w-[40%] h-[40%] bg-gradient-to-br from-indigo-400/30 via-purple-400/20 to-cyan-400/20 blur-2xl rounded-full" />

          {data.cards.map((card, i) => {
            const layout = cardPos[i];
            const position = layout[screen];
            const cardTitle = card.title;
            const cardDescription = card.description;
            const Icon = icons[card.icon];
            const color = layout.color;
            const posX = position.x;
            const posY = position.y;
            const scale = position.scale;
            const zIndex = position.z;

            return (
              <motion.div
                key={i}
                whileHover={{
                  y: posY - 10,
                  scale: scale + 0.08,
                }}
                className="group absolute w-auto max-w-[190px] p-4 rounded-2xl bg-background/85 backdrop-blur-xl border border-muted-foreground/30 hover:border-primary/30 shadow-[0_4px_16px_rgba(0,0,0,0.12)] cursor-pointer transition-colors duration-200"
                initial={{
                  x: posX,
                  y: posY,
                  scale: scale,
                }}
                animate={{
                  x: posX,
                  y: [posY, posY - 5, posY],
                  scale: active === i ? scale + 0.08 : scale,
                  zIndex: active === i ? 10 : zIndex,
                  opacity: active !== null && active !== i ? 0.4 : 1,
                }}
                transition={FLOAT_CONFIG(i)}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                <div className="flex items-center gap-2 mb-1.5">
                  <Icon
                    className={`text-sm ${color} transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3`}
                  />
                  <h3 className="text-xs font-medium tracking-wide whitespace-nowrap">
                    {cardTitle}
                  </h3>
                </div>
                <div className="h-px bg-border/40 mb-1" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {cardDescription}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
