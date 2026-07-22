import Image from "next/image";
import Link from "next/link";
import FadeIn from "./FadeIn";
import SiteNav from "./SiteNav";
import Footer from "./Footer";
import type { LocaleDict, Locale } from "@/types/locale";

function prefix(locale: Locale): string {
  return locale === "pt" ? "" : `/${locale}`;
}

export default function SobrePage({
  dict,
  locale,
}: {
  dict: LocaleDict;
  locale: Locale;
}) {
  const { about, family, siteNav, contact } = dict;
  const p = prefix(locale);
  const [introPara, ...restBody] = about.body;

  return (
    <main className="bg-background text-text-primary">
      <SiteNav dict={dict} locale={locale} />

      {/* ── Hero ── */}
      <section className="px-8 md:px-16 lg:px-20 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn direction="left" className="order-2 md:order-1 flex flex-col gap-6">
            <span className="font-barlow-condensed text-[11px] tracking-[0.35em] uppercase text-olive">
              {siteNav.about}
            </span>
            <h1 className="font-playfair leading-tight" style={{ fontSize: "clamp(38px, 5.5vw, 68px)" }}>
              <span className="font-normal text-text-primary block">{about.titleLine1}</span>
              <span className="font-normal text-text-primary block">{about.titleLine2}</span>
              <span className="italic text-olive block">{about.titleLine3}</span>
            </h1>
            <p className="font-barlow text-text-secondary leading-relaxed max-w-xl" style={{ fontSize: "clamp(18px, 1.5vw, 22px)" }}>
              {introPara}
            </p>
          </FadeIn>

          <FadeIn direction="right" className="order-1 md:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-cream-line max-w-md mx-auto">
              <Image
                src="/images/couple.jpg"
                alt="Nágila e Ewerton Decastro"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-terracotta opacity-70" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Story + credentials ── */}
      <section className="px-8 md:px-16 lg:px-20 py-16 md:py-24 bg-background-soft border-y border-cream-line">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div className="md:col-span-2 flex flex-col gap-5">
            {restBody.map((paragraph, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <p
                  className={`font-barlow leading-relaxed ${
                    i === restBody.length - 1 ? "text-text-primary font-medium" : "text-text-secondary"
                  }`}
                  style={{ fontSize: "clamp(18px, 1.5vw, 22px)" }}
                >
                  {paragraph}
                </p>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.15} className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-barlow-condensed text-[10px] tracking-[0.3em] text-text-muted uppercase">
                {about.credentials.label}
              </span>
              <ul className="flex flex-col gap-2.5">
                {about.credentials.items.map((item, i) => (
                  <li
                    key={i}
                    className="font-barlow text-text-primary leading-snug pl-3 border-l-2 border-olive"
                    style={{ fontSize: "clamp(16px, 1.2vw, 18px)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={about.partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-col gap-1 pt-6 border-t border-cream-line"
            >
              <span className="font-barlow-condensed text-[10px] tracking-[0.3em] text-text-muted uppercase">
                {about.partner.label}
              </span>
              <span className="font-playfair italic text-olive group-hover:text-text-primary transition-colors duration-300" style={{ fontSize: "clamp(16px, 1.3vw, 20px)" }}>
                {about.partner.handle}
              </span>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── Family ── */}
      <section className="w-full">
        <FadeIn direction="none" className="relative w-full aspect-[3/2] md:aspect-[16/9] max-h-[75vh] overflow-hidden">
          <Image
            src="/images/family.jpg"
            alt="Família Decastro"
            fill
            className="object-cover object-top"
            sizes="100vw"
          />
        </FadeIn>
        <div className="px-8 md:px-16 lg:px-20 py-20 md:py-28 bg-background">
          <FadeIn className="max-w-3xl mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="w-8 h-px bg-terracotta" aria-hidden="true" />
              <h2 className="font-playfair leading-tight" style={{ fontSize: "clamp(34px, 4.5vw, 56px)" }}>
                <span className="font-normal text-text-primary block">{family.titleLine1}</span>
                <span className="italic text-olive block">{family.titleLine2}</span>
              </h2>
            </div>
            <div className="flex flex-col gap-5 max-w-2xl">
              {family.body.map((paragraph, i) => (
                <p
                  key={i}
                  className={`font-barlow leading-relaxed ${
                    i === family.body.length - 1 ? "text-text-primary font-medium" : "text-text-secondary"
                  }`}
                  style={{ fontSize: "clamp(18px, 1.5vw, 22px)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-8 md:px-16 lg:px-20 py-24 md:py-32 bg-background-soft border-t border-cream-line text-center">
        <FadeIn className="max-w-2xl mx-auto flex flex-col items-center gap-8">
          <h2 className="font-playfair leading-tight" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
            <span className="font-normal text-text-primary block">{contact.titleLine1}</span>
            <span className="italic text-olive block">{contact.titleLine2}</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href={`${p}/mentorias`}
              className="inline-flex items-center gap-2 font-barlow-condensed text-sm tracking-widest uppercase px-8 py-4 bg-terracotta text-background font-semibold hover:bg-text-primary transition-colors duration-200"
            >
              {siteNav.mentorias}
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <a
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-barlow-condensed text-sm tracking-widest uppercase px-8 py-4 border border-olive text-olive hover:bg-terracotta hover:text-background transition-colors duration-200"
            >
              {contact.cta}
            </a>
          </div>
        </FadeIn>
      </section>

      <Footer dict={dict} locale={locale} />
    </main>
  );
}
