import Link from "next/link";
import FadeIn from "./FadeIn";
import { whatsAppUrl } from "@/lib/whatsapp";
import type { LocaleDict, Locale, MentoriaCard } from "@/types/locale";

interface Props {
  dict: LocaleDict;
  locale: Locale;
}

function mentoriaHref(locale: Locale, slug: string): string {
  return locale === "pt" ? `/mentorias/${slug}` : `/${locale}/mentorias/${slug}`;
}

function ServiceCard({
  card,
  locale,
  delay,
}: {
  card: MentoriaCard;
  locale: Locale;
  delay: number;
}) {
  return (
    <FadeIn delay={delay} className="relative flex flex-col bg-background-soft border border-cream-line p-8 md:p-10 overflow-hidden group hover:border-rose-accent transition-colors duration-300">
      <span
        className="absolute right-4 top-2 font-barlow-condensed font-bold text-cream-line select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(80px, 10vw, 120px)" }}
        aria-hidden="true"
      >
        {card.number}
      </span>

      <div className="relative z-10 flex flex-col flex-1 gap-6">
        <h3 className="font-playfair leading-tight" style={{ fontSize: "clamp(26px, 2.5vw, 36px)" }}>
          <span className="font-bold text-text-primary block">{card.titleLine1}</span>
          <span className="italic text-rose-accent block">{card.titleLine2}</span>
        </h3>

        <p className="font-barlow text-text-secondary leading-relaxed flex-1" style={{ fontSize: "clamp(14px, 1vw, 16px)" }}>
          {card.description}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={mentoriaHref(locale, card.slug)}
            className="font-barlow-condensed text-xs tracking-widest uppercase px-5 py-2.5 bg-rose-accent text-background font-semibold hover:bg-text-primary transition-colors duration-200"
          >
            {card.learnMore}
          </Link>
          <a
            href={whatsAppUrl(card.whatsappText)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-barlow-condensed text-xs tracking-widest uppercase px-5 py-2.5 border border-rose-accent text-rose-accent hover:bg-rose-accent hover:text-background transition-all duration-200"
          >
            {card.contactCta}
          </a>
        </div>
      </div>
    </FadeIn>
  );
}

export default function ServicesSection({ dict, locale }: Props) {
  const { services } = dict;

  return (
    <section className="w-full py-24 md:py-36 px-8 md:px-16 lg:px-20 bg-background">
      <FadeIn className="mb-16 md:mb-20 max-w-3xl">
        <div className="w-8 h-px bg-rose-accent mb-6" aria-hidden="true" />
        <h2 className="font-playfair font-normal text-text-primary mb-4" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
          {services.sectionTitle}
        </h2>
        <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}>
          {services.sectionSubtitle}
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-7xl">
        {services.cards.map((card, i) => (
          <ServiceCard
            key={card.slug}
            card={card}
            locale={locale}
            delay={i * 0.1}
          />
        ))}
      </div>
    </section>
  );
}
