import FadeIn from "./FadeIn";
import ServicesAccordion from "./ServicesAccordion";
import type { LocaleDict, Locale } from "@/types/locale";

interface Props {
  dict: LocaleDict;
  locale: Locale;
}

export default function ServicesSection({ dict, locale }: Props) {
  const { services } = dict;

  return (
    <section
      id="mentorias"
      className="w-full py-24 md:py-36 px-8 md:px-16 lg:px-20 bg-background scroll-mt-16"
    >
      <FadeIn className="mb-12 md:mb-16 max-w-3xl">
        <div className="w-8 h-px bg-rose-accent mb-6" aria-hidden="true" />
        <h2 className="font-playfair font-normal text-text-primary mb-4" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
          {services.sectionTitle}
        </h2>
        <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}>
          {services.sectionSubtitle}
        </p>
      </FadeIn>

      <FadeIn>
        <ServicesAccordion cards={services.cards} locale={locale} />
      </FadeIn>
    </section>
  );
}
