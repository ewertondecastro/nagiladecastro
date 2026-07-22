"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { LocaleDict, Locale } from "@/types/locale";

interface Props {
  dict: LocaleDict;
  locale: Locale;
}

export default function HeroSection({ dict }: Props) {
  const { hero } = dict;

  return (
    <section className="relative w-full h-screen min-h-[700px] bg-background overflow-hidden">
      {/* Hero photo, right side */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[62%] pointer-events-none select-none">
        <div className="relative w-full h-full">
          <Image
            src="/images/hero.jpg"
            alt="Nagila Decastro"
            fill
            priority
            className="object-cover object-top opacity-90"
            sizes="(max-width: 768px) 100vw, 62vw"
          />
          {/* Warm cream gradient overlay left-to-right */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-transparent md:via-background/40" />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>

      {/* Content layer */}
      <div className="relative z-10 flex flex-col justify-between h-full px-8 md:px-16 lg:px-20 pt-24 pb-8 md:pt-28 md:pb-12">
        {/* Top row */}
        <div className="flex items-start justify-between w-full">
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-barlow-condensed text-xs tracking-[0.25em] text-text-secondary uppercase max-w-[70%] md:max-w-none leading-relaxed"
          >
            {hero.tags}
          </motion.p>
        </div>

        {/* Center name block */}
        <div className="flex flex-col items-start mt-auto mb-auto pt-16 md:pt-0">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-playfair font-bold text-text-primary leading-none tracking-tight"
            style={{ fontSize: "clamp(72px, 12vw, 160px)" }}
          >
            {hero.firstName}
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-playfair italic text-olive leading-none tracking-tight"
            style={{ fontSize: "clamp(72px, 12vw, 160px)" }}
          >
            {hero.lastName}
          </motion.h1>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 pl-4 border-l-2 border-olive"
          >
            {hero.tagline.map((line, i) => (
              <p
                key={i}
                className="font-barlow text-text-secondary text-base md:text-lg leading-relaxed"
              >
                {line}
              </p>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.a
            href="#mentorias"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="mt-8 inline-flex items-center gap-2 font-barlow-condensed text-sm tracking-widest uppercase px-8 py-4 bg-terracotta text-background font-semibold hover:bg-text-primary transition-colors duration-200 shadow-lg shadow-terracotta/20"
          >
            {hero.cta}
            <span aria-hidden="true">→</span>
          </motion.a>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between w-full">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="font-barlow-condensed text-xs tracking-[0.25em] text-text-secondary uppercase"
          >
            {hero.location}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-barlow-condensed text-[10px] tracking-[0.3em] text-text-secondary uppercase">
              {hero.scrollLabel}
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-olive to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
