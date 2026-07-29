import Link from "next/link";
import FadeIn from "./FadeIn";
import type { LocaleDict, Locale } from "@/types/locale";

interface Props {
  dict: LocaleDict;
  locale: Locale;
  // Mostra o botão que leva para a página de consultorias.
  // Fica oculto quando o bloco já está dentro dessa própria página.
  showCta?: boolean;
}

// Depoimentos reais (com print) reaproveitados da Consultoria de Sono.
// Usado na home e dentro da página de consultorias.
export default function HomeTestimonials({ dict, locale, showCta = true }: Props) {
  const sono = dict.services.cards.find((c) => c.slug === "sono");
  const d = sono?.detail;
  if (!d?.testimonials || d.testimonials.length === 0) return null;

  const p = locale === "pt" ? "" : `/${locale}`;
  const seeMore =
    locale === "pt"
      ? "Ver consultorias"
      : locale === "en"
      ? "See consultations"
      : "Ver consultorías";

  return (
    <section id="depoimentos" className="w-full px-8 md:px-16 lg:px-20 py-20 md:py-28 bg-background-soft">
      <FadeIn className="max-w-5xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <div className="w-8 h-px bg-terracotta" aria-hidden="true" />
          <h2 className="font-playfair italic text-olive" style={{ fontSize: "clamp(26px, 3vw, 40px)" }}>
            {d.testimonialsTitle}
          </h2>
          {d.testimonialsNote && (
            <p className="font-barlow text-text-secondary max-w-xl" style={{ fontSize: "clamp(15px, 1.3vw, 17px)" }}>
              {d.testimonialsNote}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {d.testimonials.map((t, i) => (
            <figure key={i} className="flex flex-col bg-background border border-cream-line overflow-hidden">
              <div className="px-6 pt-6 pb-5 flex flex-col gap-4 border-l-2 border-terracotta">
                <blockquote
                  className="font-playfair italic text-text-primary leading-relaxed"
                  style={{ fontSize: "clamp(17px, 1.5vw, 21px)" }}
                >
                  “{t.quote}”
                </blockquote>
                <figcaption className="flex flex-col gap-1">
                  <span className="font-barlow-condensed text-xs tracking-[0.2em] uppercase text-text-muted">
                    {t.author}
                  </span>
                  {t.source && (
                    <span className="font-barlow-condensed text-[11px] tracking-[0.2em] uppercase text-olive">
                      Print real · {t.source}
                    </span>
                  )}
                </figcaption>
              </div>
              {t.images && t.images.length > 0 && (
                <div className="border-t border-cream-line bg-background-soft/60 p-4 flex gap-3 overflow-x-auto">
                  {t.images.map((src, k) => (
                    <a
                      key={k}
                      href={src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative shrink-0 block group"
                      title="Ver print completo"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={t.imageAlt ?? `Mensagem real de ${t.author}`}
                        loading="lazy"
                        className="h-[340px] w-auto max-w-none rounded border border-cream-line object-cover object-top"
                      />
                      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-barlow-condensed text-[10px] tracking-[0.15em] uppercase text-olive bg-background/90 px-2.5 py-1 rounded-full border border-cream-line group-hover:text-terracotta transition-colors duration-200 whitespace-nowrap">
                        Ampliar
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </figure>
          ))}
        </div>

        {d.disclaimer && (
          <p className="font-barlow text-text-muted text-center italic max-w-2xl mx-auto" style={{ fontSize: "13px" }}>
            {d.disclaimer}
          </p>
        )}

        {showCta && (
          <div className="flex justify-center pt-2">
            <Link
              href={`${p}/consultorias`}
              className="font-barlow-condensed text-sm tracking-widest uppercase px-10 py-4 bg-terracotta text-background font-semibold hover:bg-text-primary transition-colors duration-200"
            >
              {seeMore} →
            </Link>
          </div>
        )}
      </FadeIn>
    </section>
  );
}
