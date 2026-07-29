import Link from "next/link";
import FadeIn from "./FadeIn";
import ProofGallery from "./ProofGallery";
import type { LocaleDict, Locale } from "@/types/locale";

interface Props {
  dict: LocaleDict;
  locale: Locale;
  // Mostra o botão que leva para a página de consultorias.
  // Fica oculto quando o bloco já está dentro dessa própria página.
  showCta?: boolean;
}

type Testimonial = NonNullable<
  NonNullable<LocaleDict["services"]["cards"][number]["detail"]["testimonials"]>
>[number];

function Attribution({ author, source }: { author: string; source?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-6 bg-terracotta/50" aria-hidden="true" />
      <span className="font-barlow-condensed text-xs tracking-[0.22em] uppercase text-text-primary">
        {author}
      </span>
      {source && (
        <span className="font-barlow-condensed text-[10px] tracking-[0.2em] uppercase text-text-muted">
          · {source}
        </span>
      )}
    </div>
  );
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

  const featured = d.testimonials.find((t: Testimonial) => t.featured);
  const others = d.testimonials.filter((t: Testimonial) => !t.featured);

  return (
    <section id="depoimentos" className="w-full px-8 md:px-16 lg:px-20 py-20 md:py-28 bg-background-soft">
      <div className="max-w-6xl mx-auto flex flex-col gap-14 md:gap-16">
        {/* Cabeçalho */}
        <FadeIn className="max-w-2xl mx-auto text-center flex flex-col items-center gap-4">
          <span className="h-px w-10 bg-terracotta" aria-hidden="true" />
          <h2
            className="font-playfair italic text-olive leading-tight"
            style={{ fontSize: "clamp(26px, 3.2vw, 44px)" }}
          >
            {d.testimonialsTitle}
          </h2>
          {d.testimonialsNote && (
            <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(15px, 1.3vw, 17px)" }}>
              {d.testimonialsNote}
            </p>
          )}
        </FadeIn>

        {/* Destaque: a história completa de uma família, mês a mês */}
        {featured && (
          <FadeIn className="flex flex-col gap-8">
            <div className="max-w-3xl">
              <blockquote
                className="font-playfair italic text-text-primary leading-[1.35]"
                style={{ fontSize: "clamp(22px, 2.6vw, 34px)" }}
              >
                “{featured.quote}”
              </blockquote>
              <div className="mt-5">
                <Attribution author={featured.author} source={featured.source} />
              </div>
            </div>

            {featured.images && featured.images.length > 0 && (
              <div className="-mx-8 md:-mx-16 lg:-mx-20 px-8 md:px-16 lg:px-20 overflow-x-auto">
                <ProofGallery
                  variant="strip"
                  items={featured.images.map((src: string, i: number) => ({
                    src,
                    alt: featured.imageAlt ?? `Mensagem real de ${featured.author}`,
                    caption: featured.imageCaptions?.[i],
                  }))}
                />
              </div>
            )}
          </FadeIn>
        )}

        {/* Outras famílias */}
        {others.length > 0 && (
          <FadeIn className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pt-2 border-t border-cream-line">
            {others.map((t: Testimonial, i: number) => (
              <div key={i} className="flex flex-col gap-5 pt-10">
                <blockquote
                  className="font-playfair italic text-text-primary leading-relaxed"
                  style={{ fontSize: "clamp(17px, 1.45vw, 20px)" }}
                >
                  “{t.quote}”
                </blockquote>
                <Attribution author={t.author} source={t.source} />
                {t.images?.[0] && (
                  <ProofGallery
                    variant="full"
                    items={[
                      {
                        src: t.images[0],
                        alt: t.imageAlt ?? `Mensagem real de ${t.author}`,
                      },
                    ]}
                  />
                )}
              </div>
            ))}
          </FadeIn>
        )}

        {d.disclaimer && (
          <p className="font-barlow text-text-muted text-center italic max-w-2xl mx-auto" style={{ fontSize: "14px" }}>
            {d.disclaimer}
          </p>
        )}

        {showCta && (
          <div className="flex justify-center">
            <Link
              href={`${p}/consultorias`}
              className="font-barlow-condensed text-sm tracking-widest uppercase px-10 py-4 bg-terracotta text-background font-semibold hover:bg-text-primary transition-colors duration-200"
            >
              {seeMore} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
