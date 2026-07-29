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
              className="group relative bg-background-soft border border-olive/40 p-8 md:p-10 overflow-hidden flex flex-col transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-olive hover:shadow-[0_12px_30px_-18px_rgba(59,74,61,0.5)]"
            >
              {/* O cartão inteiro leva para a página da consultoria. Os botões
                  ficam acima desta camada e continuam com o destino próprio. */}
              <Link
                href={consultoriaHref(locale, card.slug)}
                className="absolute inset-0 z-10"
                aria-label={`${card.titleLine1} ${card.titleLine2}`}
              />
              <div className="relative z-20 flex flex-col flex-1 pointer-events-none">
                <span className="flex items-center gap-3 mb-5">
                  <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-terracotta">
                    {card.number}
                  </span>
                  <span className="h-px w-8 bg-terracotta/40" aria-hidden="true" />
                </span>
                <h3 className="font-playfair leading-tight mb-4" style={{ fontSize: "clamp(26px, 2.4vw, 34px)" }}>
                  <span className="font-bold text-text-primary">{card.titleLine1} </span>
                  <span className="italic text-olive">{card.titleLine2}</span>
                </h3>
                <p className="font-barlow text-text-secondary leading-relaxed mb-7" style={{ fontSize: "clamp(16px, 1.15vw, 18px)" }}>
                  {card.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-3 pointer-events-auto">
                  <a
                    href={whatsAppUrl(card.whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 font-barlow-condensed text-sm tracking-widest uppercase px-7 py-3.5 bg-terracotta text-background font-semibold hover:bg-text-primary transition-colors duration-200"
                  >
                    {card.contactCta}
                  </a>
                  <Link
                    href={consultoriaHref(locale, card.slug)}
                    className="relative z-20 font-barlow-condensed text-sm tracking-widest uppercase px-7 py-3.5 border border-olive text-olive group-hover:bg-terracotta group-hover:text-background group-hover:border-terracotta transition-all duration-200"
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
          <div className="flex flex-col gap-3">
            {rest.map((card) => (
              <div
                key={card.slug}
                className="group relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-background border border-cream-line px-6 py-5 transition-colors duration-200 ease-out hover:border-olive"
              >
                <Link
                  href={consultoriaHref(locale, card.slug)}
                  className="absolute inset-0 z-10"
                  aria-label={`${card.titleLine1} ${card.titleLine2}`}
                />
                <div className="relative z-20 flex items-baseline gap-4 pointer-events-none">
                  <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-olive/50 shrink-0">
                    {card.number}
                  </span>
                  <h4 className="font-playfair leading-tight" style={{ fontSize: "clamp(19px, 1.6vw, 23px)" }}>
                    <span className="font-bold text-text-primary">{card.titleLine1} </span>
                    <span className="italic text-olive">{card.titleLine2}</span>
                  </h4>
                </div>
                <div className="relative z-20 flex flex-wrap items-center gap-x-5 gap-y-1 shrink-0">
                  <span className="font-barlow-condensed text-[11px] tracking-widest uppercase text-olive group-hover:text-terracotta transition-colors pointer-events-none">
                    {card.learnMore} →
                  </span>
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
