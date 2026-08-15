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
      {/* Hero photo, right side */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[62%] pointer-events-none select-none">
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
          {/* No desktop o texto fica direto sobre a foto, então o véu creme
              precisa cobrir até onde ele termina (16% da moldura) e cair rápido
              logo depois, porque o rosto da Nágila começa em 17%. No celular o
              painel oliva resolve a legibilidade e o véu quase some. */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(244,239,230,0.45)_0%,rgba(244,239,230,0.1)_35%,transparent_65%)] md:bg-[linear-gradient(to_right,#F4EFE6_0%,rgba(244,239,230,0.94)_11%,rgba(244,239,230,0.6)_17%,rgba(244,239,230,0.15)_25%,transparent_32%)]" />
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

        {/* Center name block. O painel oliva translúcido acompanha o tamanho do
            bloco de texto, com respiro em volta: a foto continua aparecendo ao
            redor dele, inclusive à direita, onde estão as meninas. A margem
            negativa serve só para o texto ficar na posição original. */}
        <div className="flex flex-col items-start mt-auto md:mb-auto pt-16 md:pt-0">
          <div className="bg-olive/90 md:bg-transparent w-fit max-w-full -ml-6 md:-ml-10 pl-6 md:pl-10 pr-6 md:pr-10 py-8 md:py-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-playfair font-bold text-background md:text-text-primary leading-none tracking-tight"
            style={{ fontSize: "clamp(72px, 12vw, 160px)" }}
          >
            {hero.firstName}
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-playfair italic text-background md:text-plum leading-none tracking-tight"
            style={{ fontSize: "clamp(72px, 12vw, 160px)" }}
          >
            {hero.lastName}
          </motion.h1>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-8 pl-4 border-l-2 border-background/40 md:border-olive"
          >
            {hero.tagline.map((line, i) => (
              <p
                key={i}
                className="font-barlow text-background/85 md:text-text-secondary text-base md:text-lg leading-relaxed"
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

        {/* Bottom row. O indicador de rolagem (hero.scrollLabel + a linha
            animada) foi removido a pedido: a chave segue nos dicionários,
            então basta recolocar este bloco para reativá-lo. */}
        <div className="flex items-end justify-between w-full">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="font-barlow-condensed text-xs tracking-[0.25em] text-text-secondary uppercase"
          >
            {hero.location}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
