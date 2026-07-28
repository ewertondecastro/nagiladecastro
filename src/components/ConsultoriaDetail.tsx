import Link from "next/link";
import FadeIn from "./FadeIn";
import SiteNav from "./SiteNav";
import Footer from "./Footer";
import { whatsAppUrl } from "@/lib/whatsapp";
import type { LocaleDict, Locale, ConsultoriaCard } from "@/types/locale";

interface Props {
  dict: LocaleDict;
  locale: Locale;
  card: ConsultoriaCard;
}

function homeHref(locale: Locale): string {
  return locale === "pt" ? "/" : `/${locale}`;
}

export default function ConsultoriaDetail({ dict, locale, card }: Props) {
  const d = card.detail;

  return (
    <main className="w-full bg-background min-h-screen">
      <SiteNav dict={dict} locale={locale} />
      <div className="h-16" aria-hidden="true" />

      {/* Hero block */}
      <section className="w-full px-8 md:px-16 lg:px-20 pt-14 md:pt-20 pb-12 md:pb-16">
        <FadeIn className="max-w-4xl mx-auto flex flex-col gap-8">
          <span className="font-barlow-condensed text-xs tracking-[0.3em] text-olive uppercase">
            {d.eyebrow}
          </span>

          <h1 className="font-playfair leading-tight" style={{ fontSize: "clamp(40px, 7vw, 88px)" }}>
            <span className="font-bold text-text-primary block">{d.headlineLine1}</span>
            <span className="italic text-olive block">{d.headlineLine2}</span>
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
            <div className="w-8 h-px bg-terracotta mb-6" aria-hidden="true" />
            <h2 className="font-playfair italic text-olive" style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}>
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
            <div className="w-8 h-px bg-terracotta mb-6" aria-hidden="true" />
            <h2 className="font-playfair italic text-olive" style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}>
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

      {/* Method note (ex.: o choro na consultoria de sono) */}
      {d.methodNote && (
        <section className="w-full px-8 md:px-16 lg:px-20 py-16 md:py-24 bg-olive">
          <FadeIn className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
            <div className="md:col-span-1">
              <div className="w-8 h-px bg-terracotta mb-6" aria-hidden="true" />
              <h2 className="font-playfair italic text-background" style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}>
                {d.methodNote.title}
              </h2>
            </div>
            <div className="md:col-span-2 flex flex-col gap-5">
              {d.methodNote.body.map((p, i) => (
                <p
                  key={i}
                  className="font-barlow text-background/85 leading-relaxed"
                  style={{ fontSize: "clamp(17px, 1.45vw, 21px)" }}
                >
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {/* O que inclui */}
      {d.includes && (
        <section className="w-full px-8 md:px-16 lg:px-20 py-16 md:py-24 bg-background">
          <FadeIn className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
            <div className="md:col-span-1">
              <div className="w-8 h-px bg-terracotta mb-6" aria-hidden="true" />
              <h2 className="font-playfair italic text-olive" style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}>
                {d.includes.title}
              </h2>
            </div>
            <ul className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {d.includes.items.map((item, i) => (
                <li
                  key={i}
                  className="font-barlow text-text-primary leading-relaxed flex gap-3"
                  style={{ fontSize: "clamp(16px, 1.4vw, 20px)" }}
                >
                  <span className="text-terracotta mt-1 shrink-0" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </section>
      )}

      {/* Como funciona (passo a passo) */}
      {d.howItWorks && (
        <section className="w-full px-8 md:px-16 lg:px-20 py-16 md:py-24 bg-background-soft">
          <FadeIn className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
            <div className="md:col-span-1">
              <div className="w-8 h-px bg-terracotta mb-6" aria-hidden="true" />
              <h2 className="font-playfair italic text-olive" style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}>
                {d.howItWorks.title}
              </h2>
            </div>
            <ol className="md:col-span-2 flex flex-col gap-6">
              {d.howItWorks.steps.map((step, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="font-playfair italic text-terracotta shrink-0" style={{ fontSize: "clamp(22px, 2vw, 30px)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p
                    className="font-barlow text-text-primary leading-relaxed pt-1"
                    style={{ fontSize: "clamp(17px, 1.45vw, 21px)" }}
                  >
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </FadeIn>
        </section>
      )}

      {/* For whom section */}
      <section className="w-full px-8 md:px-16 lg:px-20 py-16 md:py-24 bg-background">
        <FadeIn className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
          <div className="md:col-span-1">
            <div className="w-8 h-px bg-terracotta mb-6" aria-hidden="true" />
            <h2 className="font-playfair italic text-olive" style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}>
              {d.forWhomTitle}
            </h2>
          </div>
          <ul className="md:col-span-2 flex flex-col gap-4">
            {d.forWhomItems.map((item, i) => (
              <li
                key={i}
                className="font-barlow text-text-primary leading-relaxed pl-5 border-l-2 border-sage-soft"
                style={{ fontSize: "clamp(17px, 1.45vw, 21px)" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      {/* Nota de gravação das calls */}
      {d.recordingNote && (
        <section className="w-full px-8 md:px-16 lg:px-20 pb-4">
          <FadeIn className="max-w-4xl mx-auto">
            <div className="flex gap-4 items-start border border-sage-soft bg-sage-soft/30 rounded-sm px-6 py-5">
              <span className="text-terracotta text-lg shrink-0" aria-hidden="true">●</span>
              <p
                className="font-barlow text-text-primary leading-relaxed"
                style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}
              >
                {d.recordingNote}
              </p>
            </div>
          </FadeIn>
        </section>
      )}

      {/* FAQ */}
      {d.faq && d.faq.length > 0 && (
        <section className="w-full px-8 md:px-16 lg:px-20 py-16 md:py-24 bg-background-soft">
          <FadeIn className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
            <div className="md:col-span-1">
              <div className="w-8 h-px bg-terracotta mb-6" aria-hidden="true" />
              <h2 className="font-playfair italic text-olive" style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}>
                {d.faqTitle ?? "Perguntas frequentes"}
              </h2>
            </div>
            <dl className="md:col-span-2 flex flex-col divide-y divide-cream-line">
              {d.faq.map((item, i) => (
                <div key={i} className="py-5 first:pt-0">
                  <dt
                    className="font-barlow font-semibold text-text-primary leading-snug"
                    style={{ fontSize: "clamp(17px, 1.45vw, 20px)" }}
                  >
                    {item.question}
                  </dt>
                  <dd
                    className="font-barlow text-text-secondary leading-relaxed mt-2"
                    style={{ fontSize: "clamp(16px, 1.4vw, 19px)" }}
                  >
                    {item.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </section>
      )}

      {/* Depoimentos */}
      {d.testimonials && d.testimonials.length > 0 && (
        <section className="w-full px-8 md:px-16 lg:px-20 py-16 md:py-24 bg-background">
          <FadeIn className="max-w-4xl mx-auto flex flex-col gap-10">
            {d.testimonialsTitle && (
              <h2 className="font-playfair italic text-olive text-center" style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}>
                {d.testimonialsTitle}
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {d.testimonials.map((t, i) => (
                <figure key={i} className="border-l-2 border-terracotta bg-background-soft px-6 py-6 flex flex-col gap-4">
                  <blockquote
                    className="font-playfair italic text-text-primary leading-relaxed"
                    style={{ fontSize: "clamp(17px, 1.5vw, 21px)" }}
                  >
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="font-barlow-condensed text-xs tracking-[0.2em] uppercase text-text-muted">
                    {t.author}
                  </figcaption>
                </figure>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {/* CTA block */}
      <section className="w-full px-8 md:px-16 lg:px-20 py-20 md:py-28 bg-background text-center">
        <FadeIn className="max-w-2xl mx-auto flex flex-col items-center gap-8">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-olive" aria-hidden="true" />
          <h3 className="font-playfair italic text-text-primary leading-tight" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>
            {card.titleLine1} {card.titleLine2}
          </h3>
          <a
            href={whatsAppUrl(d.ctaWhatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-barlow-condensed text-sm tracking-widest uppercase px-10 py-4 bg-terracotta text-background font-semibold hover:bg-text-primary transition-colors duration-200"
          >
            {d.ctaLabel}
          </a>
          <Link
            href={homeHref(locale)}
            className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-text-muted hover:text-olive transition-colors duration-200"
          >
            ← {d.backToHome}
          </Link>
        </FadeIn>
      </section>

      <Footer dict={dict} locale={locale} />
    </main>
  );
}
