import Link from "next/link";
import FadeIn from "./FadeIn";
import SiteNav from "./SiteNav";
import Footer from "./Footer";
import { whatsAppUrl } from "@/lib/whatsapp";
import type { LocaleDict, Locale, MentoriaCard } from "@/types/locale";

interface Props {
  dict: LocaleDict;
  locale: Locale;
  card: MentoriaCard;
}

function homeHref(locale: Locale): string {
  return locale === "pt" ? "/" : `/${locale}`;
}

export default function MentoriaDetail({ dict, locale, card }: Props) {
  const d = card.detail;

  return (
    <main className="w-full bg-background min-h-screen">
      <SiteNav dict={dict} locale={locale} />
      <div className="h-16" aria-hidden="true" />

      {/* Hero block */}
      <section className="w-full px-8 md:px-16 lg:px-20 pt-14 md:pt-20 pb-12 md:pb-16">
        <FadeIn className="max-w-4xl mx-auto flex flex-col gap-8">
          <span className="font-barlow-condensed text-xs tracking-[0.3em] text-rose-accent uppercase">
            {d.eyebrow}
          </span>

          <h1 className="font-playfair leading-tight" style={{ fontSize: "clamp(40px, 7vw, 88px)" }}>
            <span className="font-bold text-text-primary block">{d.headlineLine1}</span>
            <span className="italic text-rose-accent block">{d.headlineLine2}</span>
          </h1>

          <p className="font-barlow text-text-primary leading-relaxed max-w-3xl" style={{ fontSize: "clamp(17px, 1.4vw, 21px)" }}>
            {d.intro}
          </p>
        </FadeIn>
      </section>

      {/* Why section */}
      <section className="w-full px-8 md:px-16 lg:px-20 py-16 md:py-24 bg-background-soft">
        <FadeIn className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          <div className="md:col-span-1">
            <div className="w-8 h-px bg-rose-accent mb-6" aria-hidden="true" />
            <h2 className="font-playfair italic text-rose-accent" style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}>
              {d.whyTitle}
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-5">
            {d.whyBody.map((p, i) => (
              <p
                key={i}
                className={`font-barlow leading-relaxed ${
                  i === d.whyBody.length - 1 ? "text-text-primary font-medium" : "text-text-secondary"
                }`}
                style={{ fontSize: "clamp(17px, 1.45vw, 21px)" }}
              >
                {p}
              </p>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Journey section */}
      <section className="w-full px-8 md:px-16 lg:px-20 py-16 md:py-24 bg-background">
        <FadeIn className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          <div className="md:col-span-1">
            <div className="w-8 h-px bg-rose-accent mb-6" aria-hidden="true" />
            <h2 className="font-playfair italic text-rose-accent" style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}>
              {d.journeyTitle}
            </h2>
          </div>
          <div className="md:col-span-2 flex flex-col gap-5">
            {d.journeyBody.map((p, i) => (
              <p
                key={i}
                className="font-barlow text-text-secondary leading-relaxed"
                style={{ fontSize: "clamp(17px, 1.45vw, 21px)" }}
              >
                {p}
              </p>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* For whom section */}
      <section className="w-full px-8 md:px-16 lg:px-20 py-16 md:py-24 bg-background-soft">
        <FadeIn className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          <div className="md:col-span-1">
            <div className="w-8 h-px bg-rose-accent mb-6" aria-hidden="true" />
            <h2 className="font-playfair italic text-rose-accent" style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}>
              {d.forWhomTitle}
            </h2>
          </div>
          <ul className="md:col-span-2 flex flex-col gap-4">
            {d.forWhomItems.map((item, i) => (
              <li
                key={i}
                className="font-barlow text-text-primary leading-relaxed pl-5 border-l-2 border-rose-soft"
                style={{ fontSize: "clamp(17px, 1.45vw, 21px)" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      {/* CTA block */}
      <section className="w-full px-8 md:px-16 lg:px-20 py-20 md:py-28 bg-background text-center">
        <FadeIn className="max-w-2xl mx-auto flex flex-col items-center gap-8">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-rose-accent" aria-hidden="true" />
          <h3 className="font-playfair italic text-text-primary leading-tight" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>
            {card.titleLine1} {card.titleLine2}
          </h3>
          <a
            href={whatsAppUrl(d.ctaWhatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-barlow-condensed text-sm tracking-widest uppercase px-10 py-4 bg-rose-accent text-background font-semibold hover:bg-text-primary transition-colors duration-200"
          >
            {d.ctaLabel}
          </a>
          <Link
            href={homeHref(locale)}
            className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-text-muted hover:text-rose-accent transition-colors duration-200"
          >
            ← {d.backToHome}
          </Link>
        </FadeIn>
      </section>

      <Footer dict={dict} locale={locale} />
    </main>
  );
}
