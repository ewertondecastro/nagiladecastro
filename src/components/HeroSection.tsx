"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { LocaleDict, Locale } from "@/types/locale";

interface Props {
  dict: LocaleDict;
  locale: Locale;
}

export default function HeroSection({ dict, locale }: Props) {
  const { hero } = dict;
  const p = locale === "pt" ? "" : `/${locale}`;

  return (
    <section className="relative w-full h-screen min-h-[700px] bg-background overflow-hidden">
      {/* Hero photo, right side */}
      {/* No celular a foto ocupa só a faixa de cima: em tela cheia (375x812) a
          moldura fica vertical demais e corta a mãe e a filha mais velha, já
          que a foto é horizontal. Com 58% de altura os três rostos cabem. */}
      <div className="absolute top-0 right-0 w-full h-[58%] md:h-full md:w-[62%] pointer-events-none select-none">
        <div className="relative w-full h-full">
          <Image
            src="/images/hero.jpg"
            alt="Nágila Decastro"
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 62vw"
          />
          {/* Véu creme só na borda esquerda, pra emendar a foto no fundo da
              página. A legibilidade do texto vem do painel oliva, então o véu
              acaba antes do rosto da Nágila e a foto mantém a cor real. */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(244,239,230,0.5)_0%,rgba(244,239,230,0.12)_35%,transparent_65%)] md:bg-[linear-gradient(to_right,#F4EFE6_0%,rgba(244,239,230,0.85)_4%,rgba(244,239,230,0.32)_12%,rgba(244,239,230,0.07)_22%,transparent_32%)]" />
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

        {/* Center name block. O painel oliva sangra até a borda esquerda da
            tela e termina logo depois do texto, sem avançar sobre o rosto. */}
        <div className="flex flex-col items-start mt-auto md:mb-auto pt-16 md:pt-0">
          <div className="bg-olive self-stretch md:self-start md:w-fit max-w-none md:max-w-full -mx-8 md:mx-0 md:-ml-16 lg:-ml-20 px-8 md:pl-16 lg:pl-20 md:pr-8 py-10 md:py-12">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-playfair font-bold text-background leading-none tracking-tight"
            style={{ fontSize: "clamp(72px, 12vw, 160px)" }}
          >
            {hero.firstName}
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-playfair italic text-background leading-none tracking-tight"
            style={{ fontSize: "clamp(72px, 12vw, 160px)" }}
          >
            {hero.lastName}
          </motion.h1>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 pl-4 border-l-2 border-background/40"
          >
            {hero.tagline.map((line, i) => (
              <p
                key={i}
                className="font-barlow text-background/85 text-base md:text-lg leading-relaxed"
              >
                {line}
              </p>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.a
            href={`${p}/consultorias/sono`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="mt-8 inline-flex items-center gap-2 font-barlow-condensed text-sm tracking-widest uppercase px-8 py-4 bg-terracotta text-background font-semibold hover:bg-text-primary transition-colors duration-200 shadow-lg shadow-terracotta/20"
          >
            {hero.cta}
            <span aria-hidden="true">→</span>
          </motion.a>
          </div>
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
