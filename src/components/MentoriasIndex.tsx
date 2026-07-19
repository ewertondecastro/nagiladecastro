import Link from "next/link";
import FadeIn from "./FadeIn";
import SiteNav from "./SiteNav";
import Footer from "./Footer";
import type { LocaleDict, Locale } from "@/types/locale";

function prefix(locale: Locale): string {
  return locale === "pt" ? "" : `/${locale}`;
}

export default function MentoriasIndex({
  dict,
  locale,
}: {
  dict: LocaleDict;
  locale: Locale;
}) {
  const { services, siteNav, contact } = dict;
  const p = prefix(locale);

  return (
    <main className="bg-background text-text-primary">
      <SiteNav dict={dict} locale={locale} />

      {/* ── Hero ── */}
      <section className="px-8 md:px-16 lg:px-20 pt-32 md:pt-40 pb-12 md:pb-16">
        <FadeIn className="max-w-3xl">
          <span className="font-barlow-condensed text-[11px] tracking-[0.35em] uppercase text-rose-accent">
            {siteNav.mentorias}
          </span>
          <h1 className="font-playfair font-normal text-text-primary mt-5 mb-5" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
            {services.sectionTitle}
          </h1>
          <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(16px, 1.3vw, 19px)" }}>
            {services.sectionSubtitle}
          </p>
        </FadeIn>
      </section>

      {/* ── Grid ── */}
      <section className="px-8 md:px-16 lg:px-20 pb-8 md:pb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {services.cards.map((card, i) => (
            <FadeIn key={card.slug} delay={i * 0.08}>
              <Link
                href={`${p}/mentorias/${card.slug}`}
                className="group flex flex-col h-full bg-background-soft border border-cream-line p-8 md:p-10 hover:border-rose-accent transition-colors duration-300"
              >
                <span className="font-playfair italic text-rose-accent/60 mb-5" style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>
                  {card.number}
                </span>
                <h2 className="font-playfair leading-tight mb-4" style={{ fontSize: "clamp(26px, 2.6vw, 38px)" }}>
                  <span className="font-bold text-text-primary block">{card.titleLine1}</span>
                  <span className="italic text-rose-accent block">{card.titleLine2}</span>
                </h2>
                <p className="font-barlow text-text-secondary leading-relaxed flex-1 mb-6" style={{ fontSize: "clamp(14px, 1.05vw, 16px)" }}>
                  {card.description}
                </p>
                <span className="font-barlow-condensed text-xs tracking-[0.2em] uppercase text-rose-accent inline-flex items-center gap-2">
                  {card.learnMore}
                  <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform duration-200">
                    &rarr;
                  </span>
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-8 md:px-16 lg:px-20 py-24 md:py-32 text-center">
        <FadeIn className="max-w-2xl mx-auto flex flex-col items-center gap-8">
          <div className="w-px h-14 bg-gradient-to-b from-transparent to-rose-accent" aria-hidden="true" />
          <h2 className="font-playfair leading-tight" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
            <span className="font-normal text-text-primary block">{contact.titleLine1}</span>
            <span className="italic text-rose-accent block">{contact.titleLine2}</span>
          </h2>
          <a
            href={contact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-barlow-condensed text-sm tracking-widest uppercase px-8 py-4 bg-rose-accent text-background font-semibold hover:bg-text-primary transition-colors duration-200"
          >
            {contact.cta}
          </a>
        </FadeIn>
      </section>

      <Footer dict={dict} locale={locale} />
    </main>
  );
}
