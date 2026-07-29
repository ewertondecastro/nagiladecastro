"use client";

import { useCallback, useEffect, useState } from "react";

export interface ProofItem {
  src: string;
  alt: string;
  caption?: string;
}

interface Props {
  items: ProofItem[];
  // Layout: faixa horizontal (destaque) ou preenchendo a coluna (grade).
  variant?: "strip" | "full";
}

// Prints reais do WhatsApp. Ao tocar, o print amplia numa camada sobre a
// própria página, sem tirar a visitante do site.
export default function ProofGallery({ items, variant = "strip" }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const go = useCallback(
    (step: number) =>
      setOpenIndex((i) => (i === null ? i : (i + step + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, close, go]);

  const frame =
    variant === "strip"
      ? "w-[240px] sm:w-[260px] h-[330px] sm:h-[370px]"
      : "w-full h-[340px] md:h-[360px]";

  const current = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      <div
        className={
          variant === "strip"
            ? "flex items-start gap-5 md:gap-6 pb-2"
            : "flex flex-col gap-2.5"
        }
      >
        {items.map((item, i) => (
          <figure
            key={item.src}
            className={`shrink-0 flex flex-col gap-2.5 max-w-full ${
              variant === "strip" ? "w-[240px] sm:w-[260px]" : "w-full"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label="Ampliar o print da conversa"
              className={`group relative block w-full overflow-hidden rounded-sm border border-cream-line bg-background shadow-[0_2px_14px_-8px_rgba(45,36,30,0.35)] transition-all duration-200 ease-out hover:shadow-[0_10px_28px_-12px_rgba(45,36,30,0.45)] hover:border-sage cursor-zoom-in ${frame}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-text-primary/0 opacity-0 transition-all duration-200 group-hover:bg-text-primary/25 group-hover:opacity-100">
                <span className="font-barlow-condensed text-[11px] tracking-[0.25em] uppercase text-background bg-text-primary/70 px-4 py-2 rounded-full">
                  Ampliar
                </span>
              </span>
            </button>
            {item.caption && (
              <figcaption
                className="font-barlow text-text-muted italic w-full leading-snug"
                style={{ fontSize: "13.5px" }}
              >
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      {/* Camada de ampliação, sobre a própria página */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-text-primary/80 backdrop-blur-sm px-4 py-6 animate-[fadeIn_200ms_ease-out]"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-background/90 text-text-primary hover:bg-terracotta hover:text-background transition-colors duration-200 text-xl leading-none"
          >
            ×
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Anterior"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-background/85 text-text-primary hover:bg-terracotta hover:text-background transition-colors duration-200"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Próximo"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-background/85 text-text-primary hover:bg-terracotta hover:text-background transition-colors duration-200"
              >
                ›
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[78vh] max-w-[min(92vw,520px)] w-auto object-contain rounded-sm border border-background/20 shadow-2xl bg-background"
          />

          {current.caption && (
            <p
              onClick={(e) => e.stopPropagation()}
              className="font-barlow italic text-background/90 text-center max-w-[min(92vw,520px)]"
              style={{ fontSize: "14px" }}
            >
              {current.caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
