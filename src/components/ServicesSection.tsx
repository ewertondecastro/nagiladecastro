import Link from "next/link";
import FadeIn from "./FadeIn";
import { whatsAppUrl } from "@/lib/whatsapp";
import type { LocaleDict, Locale } from "@/types/locale";

interface Props {
  dict: LocaleDict;
  locale: Locale;
}

function consultoriaHref(locale: Locale, slug: string): string {
  return locale === "pt" ? `/consultorias/${slug}` : `/${locale}/consultorias/${slug}`;
}

export default function ServicesSection({ dict, locale }: Props) {
  const { services } = dict;
  const [featured, ...rest] = services.cards;

  return (
    <section
      id="consultorias"
      className="w-full py-24 md:py-36 px-8 md:px-16 lg:px-20 bg-background scroll-mt-16"
    >
      <FadeIn className="mb-12 md:mb-16 max-w-3xl">
        <div className="w-8 h-px bg-terracotta mb-6" aria-hidden="true" />
        <h2 className="font-playfair font-normal text-text-primary mb-4" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
          {services.sectionTitle}
        </h2>
        <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(17px, 1.45vw, 21px)" }}>
          {services.sectionSubtitle}
        </p>
      </FadeIn>

      {/* Destaque: consultoria principal */}
      {featured && (
        <FadeIn className="max-w-5xl">
          <div className="relative bg-background-soft border border-olive/40 p-8 md:p-12 overflow-hidden">
            <span
              aria-hidden="true"
              className="absolute right-6 top-2 font-barlow-condensed font-bold text-cream-line select-none pointer-events-none leading-none"
              style={{ fontSize: "clamp(90px, 12vw, 150px)" }}
            >
              {featured.number}
            </span>
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block font-barlow-condensed text-[10px] tracking-[0.3em] uppercase bg-terracotta text-background px-3 py-1 mb-6">
                {services.featuredTag}
              </span>
              <h3 className="font-playfair leading-tight mb-5" style={{ fontSize: "clamp(30px, 3.4vw, 46px)" }}>
                <span className="font-bold text-text-primary">{featured.titleLine1} </span>
                <span className="italic text-olive">{featured.titleLine2}</span>
              </h3>
              <p className="font-barlow text-text-secondary leading-relaxed mb-7" style={{ fontSize: "clamp(16px, 1.15vw, 18px)" }}>
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={whatsAppUrl(featured.whatsappText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-barlow-condensed text-sm tracking-widest uppercase px-8 py-4 bg-terracotta text-background font-semibold hover:bg-text-primary transition-colors duration-200"
                >
                  {featured.contactCta}
                </a>
                <Link
                  href={consultoriaHref(locale, featured.slug)}
                  className="font-barlow-condensed text-sm tracking-widest uppercase px-8 py-4 border border-olive text-olive hover:bg-terracotta hover:text-background transition-all duration-200"
                >
                  {featured.learnMore}
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      )}

      {/* Secundárias: outras frentes, menores */}
      {rest.length > 0 && (
        <FadeIn className="max-w-5xl mt-10">
          <p className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-text-muted mb-5">
            {services.othersLabel}
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {rest.map((card) => (
              <div
                key={card.slug}
                className="flex flex-col gap-3 bg-background border border-cream-line p-6 hover:border-olive transition-colors duration-200"
              >
                <span className="font-barlow-condensed text-xs text-olive/50">{card.number}</span>
                <h4 className="font-playfair leading-tight" style={{ fontSize: "clamp(20px, 1.8vw, 24px)" }}>
                  <span className="font-bold text-text-primary">{card.titleLine1} </span>
                  <span className="italic text-olive">{card.titleLine2}</span>
                </h4>
                <div className="mt-auto pt-3 flex flex-wrap gap-x-4 gap-y-1">
                  <Link
                    href={consultoriaHref(locale, card.slug)}
                    className="font-barlow-condensed text-[11px] tracking-widest uppercase text-olive hover:text-text-primary transition-colors"
                  >
                    {card.learnMore} →
                  </Link>
                  <a
                    href={whatsAppUrl(card.whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-barlow-condensed text-[11px] tracking-widest uppercase text-text-muted hover:text-olive transition-colors"
                  >
                    {card.contactCta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      )}
    </section>
  );
}
