"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { whatsAppUrl } from "@/lib/whatsapp";
import type { Locale, MentoriaCard } from "@/types/locale";

function mentoriaHref(locale: Locale, slug: string): string {
  return locale === "pt" ? `/mentorias/${slug}` : `/${locale}/mentorias/${slug}`;
}

export default function ServicesAccordion({
  cards,
  locale,
}: {
  cards: MentoriaCard[];
  locale: Locale;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="max-w-4xl border-t border-cream-line">
      {cards.map((card, i) => {
        const isOpen = open === i;
        return (
          <div key={card.slug} className="border-b border-cream-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left group"
            >
              <span className="flex items-baseline gap-4 md:gap-6">
                <span className="font-barlow-condensed text-sm text-rose-accent/50 tabular-nums pt-1">
                  {card.number}
                </span>
                <span
                  className="font-playfair leading-tight text-text-primary group-hover:text-rose-accent transition-colors duration-200"
                  style={{ fontSize: "clamp(22px, 2.6vw, 34px)" }}
                >
                  {card.titleLine1}{" "}
                  <span className="italic text-rose-accent">{card.titleLine2}</span>
                </span>
              </span>
              <span
                className={`shrink-0 text-rose-accent text-2xl leading-none transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 md:pl-14 max-w-2xl">
                    <p
                      className="font-barlow text-text-secondary leading-relaxed mb-6"
                      style={{ fontSize: "clamp(16px, 1.2vw, 18px)" }}
                    >
                      {card.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={whatsAppUrl(card.whatsappText)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-barlow-condensed text-xs tracking-widest uppercase px-5 py-2.5 bg-rose-accent text-background font-semibold hover:bg-text-primary transition-colors duration-200"
                      >
                        {card.contactCta}
                      </a>
                      <Link
                        href={mentoriaHref(locale, card.slug)}
                        className="font-barlow-condensed text-xs tracking-widest uppercase px-5 py-2.5 border border-rose-accent text-rose-accent hover:bg-rose-accent hover:text-background transition-all duration-200"
                      >
                        {card.learnMore}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
