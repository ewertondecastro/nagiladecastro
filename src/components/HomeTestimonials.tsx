import Link from "next/link";
import FadeIn from "./FadeIn";
import type { LocaleDict, Locale } from "@/types/locale";

interface Props {
  dict: LocaleDict;
  locale: Locale;
}

// Depoimentos na home: reaproveita os depoimentos reais (com print) da
// Consultoria de Sono e conduz o visitante para a página de vendas.
export default function HomeTestimonials({ dict, locale }: Props) {
  const sono = dict.services.cards.find((c) => c.slug === "sono");
  const d = sono?.detail;
  if (!d?.testimonials || d.testimonials.length === 0) return null;

  const p = locale === "pt" ? "" : `/${locale}`;
  const seeMore =
    locale === "pt"
      ? "Ver a Consultoria de Sono"
      : locale === "en"
      ? "See the Sleep Consultation"
      : "Ver la Consultoría de Sueño";

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
              {t.image && (
                <a
                  href={t.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block border-t border-cream-line group"
                  title="Ver print completo"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image}
                    alt={t.imageAlt ?? `Mensagem real de ${t.author}`}
                    loading="lazy"
                    className="w-full max-h-[380px] object-cover object-top"
                  />
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-barlow-condensed text-[11px] tracking-[0.2em] uppercase text-olive bg-background/90 px-3 py-1 rounded-full border border-cream-line group-hover:text-terracotta transition-colors duration-200 whitespace-nowrap">
                    Ver print completo
                  </span>
                </a>
              )}
            </figure>
          ))}
        </div>

        {d.disclaimer && (
          <p className="font-barlow text-text-muted text-center italic max-w-2xl mx-auto" style={{ fontSize: "13px" }}>
            {d.disclaimer}
          </p>
        )}

        <div className="flex justify-center pt-2">
          <Link
            href={`${p}/consultorias/sono`}
            className="font-barlow-condensed text-sm tracking-widest uppercase px-10 py-4 bg-terracotta text-background font-semibold hover:bg-text-primary transition-colors duration-200"
          >
            {seeMore} →
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
