import FadeIn from "./FadeIn";
import ConsultoriaCards from "./ConsultoriaCards";
import type { LocaleDict, Locale } from "@/types/locale";

interface Props {
  dict: LocaleDict;
  locale: Locale;
}

export default function ServicesSection({ dict, locale }: Props) {
  const { services } = dict;

  return (
    <section
      id="consultorias"
      className="w-full py-24 md:py-36 px-8 md:px-16 lg:px-20 bg-background scroll-mt-16"
    >
      <FadeIn className="mb-12 md:mb-16 max-w-3xl">
        <img src="/images/brand/star-mark.png" alt="" aria-hidden="true" className="w-6 h-6 mb-6" />
        <h2 className="font-playfair font-normal text-text-primary mb-4" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
          {services.sectionTitle}
        </h2>
        <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(17px, 1.45vw, 21px)" }}>
          {services.sectionSubtitle}
        </p>
      </FadeIn>

      <ConsultoriaCards dict={dict} locale={locale} />
    </section>
  );
}
