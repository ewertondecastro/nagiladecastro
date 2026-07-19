import Link from "next/link";
import FadeIn from "./FadeIn";
import type { LocaleDict, Locale } from "@/types/locale";

interface Props {
  dict: LocaleDict;
  locale: Locale;
}

function prefix(locale: Locale): string {
  return locale === "pt" ? "" : `/${locale}`;
}

export default function ResourcesVitrine({ dict, locale }: Props) {
  const { products } = dict;
  const featured = products.items.filter((i) => i.image).slice(0, 3);
  const recursosHref = `${prefix(locale)}/recursos`;

  return (
    <section className="w-full py-24 md:py-32 px-8 md:px-16 lg:px-20 bg-background border-t border-cream-line">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-14 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="w-8 h-px bg-rose-accent mb-6" aria-hidden="true" />
            <h2 className="font-playfair font-normal text-text-primary mb-4" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
              {products.sectionTitle}
            </h2>
            <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(17px, 1.45vw, 21px)" }}>
              {products.sectionSubtitle}
            </p>
          </div>
          <Link
            href={recursosHref}
            className="hidden md:inline-flex items-center gap-2 font-barlow-condensed text-sm tracking-widest uppercase text-text-secondary hover:text-rose-accent transition-colors duration-200 whitespace-nowrap"
          >
            {products.teaserCta}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((item, i) => {
            const href = item.linkUrl ?? recursosHref;
            return (
              <FadeIn key={item.titleLine1 + i} delay={i * 0.1}>
                <Link
                  href={href}
                  className="group flex flex-col bg-background border border-cream-line overflow-hidden hover:border-rose-accent transition-colors duration-300 h-full"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-background-soft">
                    <img
                      src={item.image}
                      alt={`${item.titleLine1} ${item.titleLine2}`}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                      draggable={false}
                    />
                    <span className="absolute top-4 left-4 inline-block font-barlow-condensed text-[10px] tracking-[0.3em] uppercase px-3 py-1 bg-rose-accent text-background">
                      {item.badge}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-6 md:p-7">
                    <h3 className="font-playfair leading-tight mb-3" style={{ fontSize: "clamp(20px, 1.8vw, 26px)" }}>
                      <span className="font-bold text-text-primary block">{item.titleLine1}</span>
                      <span className="italic text-rose-accent block">{item.titleLine2}</span>
                    </h3>
                    <p className="font-barlow text-text-secondary leading-relaxed text-sm flex-1 mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    <span className="font-barlow-condensed text-xs tracking-[0.2em] uppercase text-rose-accent inline-flex items-center gap-2">
                      {item.cta}
                      <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform duration-200">
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn className="mt-12 md:hidden">
          <Link
            href={recursosHref}
            className="inline-flex items-center gap-2 font-barlow-condensed text-sm tracking-widest uppercase px-8 py-4 bg-rose-accent text-background font-semibold hover:bg-text-primary transition-colors duration-200"
          >
            {products.teaserCta}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
