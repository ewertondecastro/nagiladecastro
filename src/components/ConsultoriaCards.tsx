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

// Cartões das consultorias, com hierarquia: as duas primeiras (Sono e Educação
// Parental) são as principais, do mesmo tamanho; da terceira em diante entram
// como frentes secundárias. Reutilizado na home e na página de consultorias.
export default function ConsultoriaCards({ dict, locale }: Props) {
  const { services } = dict;
  const featured = services.cards.slice(0, 2);
  const rest = services.cards.slice(2);

  return (
    <>
      {featured.length > 0 && (
        <FadeIn className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 items-stretch">
          {featured.map((card) => (
            <div
              key={card.slug}
              className="relative bg-background-soft border border-olive/40 p-8 md:p-10 overflow-hidden flex flex-col"
            >
              <span
                aria-hidden="true"
                className="absolute right-5 top-1 font-barlow-condensed font-bold text-cream-line select-none pointer-events-none leading-none"
                style={{ fontSize: "clamp(80px, 9vw, 120px)" }}
              >
                {card.number}
              </span>
              <div className="relative z-10 flex flex-col flex-1">
                <h3 className="font-playfair leading-tight mb-4" style={{ fontSize: "clamp(26px, 2.6vw, 38px)" }}>
                  <span className="font-bold text-text-primary">{card.titleLine1} </span>
                  <span className="italic text-olive">{card.titleLine2}</span>
                </h3>
                <p className="font-barlow text-text-secondary leading-relaxed mb-7" style={{ fontSize: "clamp(16px, 1.15vw, 18px)" }}>
                  {card.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-3">
                  <a
                    href={whatsAppUrl(card.whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-barlow-condensed text-sm tracking-widest uppercase px-7 py-3.5 bg-terracotta text-background font-semibold hover:bg-text-primary transition-colors duration-200"
                  >
                    {card.contactCta}
                  </a>
                  <Link
                    href={consultoriaHref(locale, card.slug)}
                    className="font-barlow-condensed text-sm tracking-widest uppercase px-7 py-3.5 border border-olive text-olive hover:bg-terracotta hover:text-background transition-all duration-200"
                  >
                    {card.learnMore}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </FadeIn>
      )}

      {rest.length > 0 && (
        <FadeIn className="max-w-5xl mx-auto mt-10">
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
    </>
  );
}
