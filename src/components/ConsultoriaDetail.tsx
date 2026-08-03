import Link from "next/link";
import FadeIn from "./FadeIn";
import SiteNav from "./SiteNav";
import Footer from "./Footer";
import ChapterPhrase from "./ChapterPhrase";
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

      {/* Método: o que eu observo antes de sugerir mudança (passo a passo) */}
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

      {/* Method note (ex.: o choro na consultoria de sono) */}
      {d.methodNote && (
        <div className="w-full bg-olive">
          <section className="w-full px-8 md:px-16 lg:px-20 py-16 md:py-24">
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
        </div>
      )}

      {/* Frase-capítulo (respiro editorial) */}
      {d.chapterPhrase && <ChapterPhrase text={d.chapterPhrase} />}

      {/* Planos / formatos (ex.: Completa e Express) */}
      {d.plans && d.plans.length > 0 && (
        <section className="w-full px-8 md:px-16 lg:px-20 py-16 md:py-24 bg-background">
          <FadeIn className="max-w-5xl mx-auto flex flex-col gap-12">
            <div className="text-center flex flex-col items-center gap-4">
              <div className="w-8 h-px bg-terracotta" aria-hidden="true" />
              <h2 className="font-playfair italic text-olive" style={{ fontSize: "clamp(26px, 3vw, 40px)" }}>
                {d.plansTitle ?? "Como podemos trabalhar juntas"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
              {d.plans.map((plan, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-6 px-7 py-8 md:px-9 md:py-10 h-full ${
                    plan.highlight
                      ? "bg-background-soft border-2 border-terracotta"
                      : "bg-background border border-cream-line"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    {plan.duration && (
                      <span className="font-barlow-condensed text-[11px] tracking-[0.25em] uppercase text-terracotta">
                        {plan.duration}
                      </span>
                    )}
                    <h3 className="font-playfair text-text-primary" style={{ fontSize: "clamp(24px, 2.6vw, 32px)" }}>
                      {plan.name}
                    </h3>
                    {plan.price && (
                      <div className="mt-1">
                        <span className="font-playfair text-olive" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>
                          {plan.price}
                        </span>
                        {plan.priceNote && (
                          <span className="font-barlow text-text-muted block mt-1" style={{ fontSize: "14px" }}>
                            {plan.priceNote}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(16px, 1.4vw, 19px)" }}>
                    {plan.summary}
                  </p>

                  {plan.forWhom && (
                    <p className="font-playfair italic text-olive leading-relaxed" style={{ fontSize: "clamp(15px, 1.35vw, 18px)" }}>
                      {plan.forWhom}
                    </p>
                  )}

                  <ul className="flex flex-col gap-3 flex-1">
                    {plan.includes.map((item, j) => (
                      <li
                        key={j}
                        className="font-barlow text-text-primary leading-relaxed flex gap-3"
                        style={{ fontSize: "clamp(15px, 1.35vw, 18px)" }}
                      >
                        <img src="/images/brand/star-mark.png" alt="" aria-hidden="true" className="w-4 h-4 mt-1 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={whatsAppUrl(plan.ctaWhatsappText ?? d.ctaWhatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-barlow-condensed text-sm tracking-widest uppercase px-8 py-4 text-center font-semibold transition-colors duration-200 ${
                      plan.highlight
                        ? "bg-terracotta text-background hover:bg-text-primary"
                        : "border border-olive text-olive hover:bg-olive hover:text-background"
                    }`}
                  >
                    {plan.ctaLabel ?? d.ctaLabel}
                  </a>
                </div>
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
                  <img src="/images/brand/star-mark.png" alt="" aria-hidden="true" className="w-4 h-4 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
            <div className="md:col-span-2 flex flex-col divide-y divide-cream-line border-t border-cream-line">
              {d.faq.map((item, i) => (
                <details key={i} className="group py-5">
                  <summary className="flex justify-between items-start gap-4 cursor-pointer list-none">
                    <span
                      className="font-barlow font-semibold text-text-primary leading-snug"
                      style={{ fontSize: "clamp(17px, 1.45vw, 20px)" }}
                    >
                      {item.question}
                    </span>
                    <span
                      className="text-terracotta shrink-0 mt-1 transition-transform duration-200 group-open:rotate-45"
                      aria-hidden="true"
                      style={{ fontSize: "22px", lineHeight: 1 }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="font-barlow text-text-secondary leading-relaxed mt-3 pr-8"
                    style={{ fontSize: "clamp(16px, 1.4vw, 19px)" }}
                  >
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {/* Aviso (disclaimer) */}
      {d.disclaimer && (
        <section className="w-full px-8 md:px-16 lg:px-20 pt-4 pb-2 bg-background">
          <p className="font-barlow text-text-muted text-center italic max-w-2xl mx-auto" style={{ fontSize: "14px" }}>
            {d.disclaimer}
          </p>
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
