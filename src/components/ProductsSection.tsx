"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";
import LeadCaptureModal from "./LeadCaptureModal";
import { whatsAppUrl } from "@/lib/whatsapp";
import type { LocaleDict, ProductItem } from "@/types/locale";

interface Props {
  dict: LocaleDict;
}

const ctaClass =
  "self-start font-barlow-condensed text-xs tracking-widest uppercase px-6 py-3 bg-rose-accent text-background font-semibold hover:bg-text-primary transition-colors duration-200";

function CardMedia({ item }: { item: ProductItem }) {
  const isFree = item.kind === "free";
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-background-soft">
      {item.image ? (
        <img
          src={item.image}
          alt={`${item.titleLine1} ${item.titleLine2}`}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-rose-accent via-rose-accent to-[#a56a5d] text-center px-8">
          {/* Decorative crescent moon + stars */}
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <path d="M42 10a22 22 0 1 0 0 44 17 17 0 0 1 0-44Z" fill="#FAF4EA" fillOpacity="0.92" />
            <circle cx="44" cy="20" r="1.8" fill="#FAF4EA" fillOpacity="0.8" />
            <circle cx="50" cy="27" r="1.2" fill="#FAF4EA" fillOpacity="0.7" />
            <circle cx="46" cy="33" r="1" fill="#FAF4EA" fillOpacity="0.6" />
          </svg>
          <span
            className="font-playfair italic text-background leading-tight"
            style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}
          >
            {item.titleLine1} {item.titleLine2}
          </span>
        </div>
      )}
      <span
        className={`absolute top-4 left-4 inline-block font-barlow-condensed text-[10px] tracking-[0.3em] uppercase px-3 py-1 ${
          isFree ? "bg-background text-rose-accent" : "bg-rose-accent text-background"
        }`}
      >
        {item.badge}
      </span>
    </div>
  );
}

function ProductCard({
  item,
  delay,
  leadForm,
  locale,
}: {
  item: ProductItem;
  delay: number;
  leadForm: LocaleDict["leadForm"];
  locale: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <FadeIn
      delay={delay}
      className="group flex flex-col bg-background border border-cream-line overflow-hidden hover:border-rose-accent transition-colors duration-300"
    >
      <CardMedia item={item} />

      <div className="flex flex-col flex-1 p-7 md:p-8">
        <h3 className="font-playfair leading-tight mb-4" style={{ fontSize: "clamp(22px, 2vw, 30px)" }}>
          <span className="font-bold text-text-primary block">{item.titleLine1}</span>
          <span className="italic text-rose-accent block">{item.titleLine2}</span>
        </h3>

        <p className="font-barlow text-text-secondary leading-relaxed flex-1 mb-6" style={{ fontSize: "clamp(14px, 1vw, 16px)" }}>
          {item.description}
        </p>

        {item.gated ? (
          <button type="button" onClick={() => setModalOpen(true)} className={ctaClass}>
            {item.cta}
          </button>
        ) : item.linkUrl ? (
          <a href={item.linkUrl} className={ctaClass}>
            {item.cta}
          </a>
        ) : item.downloadUrl ? (
          <a href={item.downloadUrl} download={item.downloadFilename} className={ctaClass}>
            {item.cta}
          </a>
        ) : (
          <a
            href={whatsAppUrl(item.whatsappText ?? "")}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClass}
          >
            {item.cta}
          </a>
        )}
      </div>

      {modalOpen && (
        <LeadCaptureModal
          leadForm={leadForm}
          item={item}
          locale={locale}
          onClose={() => setModalOpen(false)}
        />
      )}
    </FadeIn>
  );
}

export default function ProductsSection({ dict }: Props) {
  const { products, leadForm, meta } = dict;

  return (
    <section className="w-full py-20 md:py-28 px-8 md:px-16 lg:px-20 bg-background-soft">
      <FadeIn className="mb-14 md:mb-18 max-w-3xl">
        <div className="w-8 h-px bg-rose-accent mb-6" aria-hidden="true" />
        <h2 className="font-playfair font-normal text-text-primary mb-4" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
          {products.sectionTitle}
        </h2>
        <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}>
          {products.sectionSubtitle}
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl">
        {products.items.map((item, i) => (
          <ProductCard
            key={i}
            item={item}
            delay={i * 0.08}
            leadForm={leadForm}
            locale={meta.locale}
          />
        ))}
      </div>
    </section>
  );
}
