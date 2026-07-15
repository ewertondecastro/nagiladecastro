import Link from "next/link";
import FadeIn from "./FadeIn";
import type { LocaleDict, Locale } from "@/types/locale";

function recursosHref(locale: Locale): string {
  return locale === "pt" ? "/recursos" : `/${locale}/recursos`;
}

export default function ResourcesTeaser({
  dict,
  locale,
}: {
  dict: LocaleDict;
  locale: Locale;
}) {
  const { products } = dict;

  return (
    <section className="w-full py-24 md:py-32 px-8 md:px-16 lg:px-20 bg-background-soft border-t border-cream-line">
      <FadeIn className="max-w-3xl">
        <div className="w-8 h-px bg-rose-accent mb-6" aria-hidden="true" />
        <h2 className="font-playfair font-normal text-text-primary mb-4" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
          {products.sectionTitle}
        </h2>
        <p className="font-barlow text-text-secondary leading-relaxed mb-8 max-w-2xl" style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}>
          {products.sectionSubtitle}
        </p>
        <Link
          href={recursosHref(locale)}
          className="inline-flex items-center gap-2 font-barlow-condensed text-sm tracking-widest uppercase px-8 py-4 bg-rose-accent text-background font-semibold hover:bg-text-primary transition-colors duration-200"
        >
          {products.teaserCta}
          <span aria-hidden="true">→</span>
        </Link>
      </FadeIn>
    </section>
  );
}
