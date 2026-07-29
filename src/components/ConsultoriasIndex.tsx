import FadeIn from "./FadeIn";
import SiteNav from "./SiteNav";
import Footer from "./Footer";
import ConsultoriaCards from "./ConsultoriaCards";
import HomeTestimonials from "./HomeTestimonials";
import { whatsAppUrl } from "@/lib/whatsapp";
import type { LocaleDict, Locale } from "@/types/locale";

export default function ConsultoriasIndex({
  dict,
  locale,
}: {
  dict: LocaleDict;
  locale: Locale;
}) {
  const { services, siteNav, contact } = dict;
  // Numa página de vendas o contato principal é o WhatsApp, não o DM.
  const sono = services.cards[0];
  const waHref = whatsAppUrl(sono?.whatsappText ?? contact.titleLine1);
  const waLabel = sono?.contactCta ?? contact.cta;

  return (
    <main className="bg-background text-text-primary">
      <SiteNav dict={dict} locale={locale} />

      {/* ── Hero ── */}
      <section className="px-8 md:px-16 lg:px-20 pt-32 md:pt-40 pb-14 md:pb-20">
        <FadeIn className="max-w-3xl">
          <span className="font-barlow-condensed text-[11px] tracking-[0.35em] uppercase text-olive">
            {siteNav.consultorias}
          </span>
          <h1 className="font-playfair font-normal text-text-primary mt-5 mb-5" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
            {services.sectionTitle}
          </h1>
          <p className="font-barlow text-text-secondary leading-relaxed mb-8" style={{ fontSize: "clamp(18px, 1.5vw, 22px)" }}>
            {services.sectionSubtitle}
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-barlow-condensed text-sm tracking-widest uppercase px-8 py-4 bg-terracotta text-background font-semibold hover:bg-text-primary transition-colors duration-200"
          >
            {waLabel}
          </a>
        </FadeIn>
      </section>

      {/* ── Consultorias ── */}
      <section className="px-8 md:px-16 lg:px-20 pb-8 md:pb-16">
        <ConsultoriaCards dict={dict} locale={locale} />
      </section>

      {/* ── Depoimentos (prova real) ── */}
      <HomeTestimonials dict={dict} locale={locale} showCta={false} />

      {/* ── Fechamento: conduzir à ação ── */}
      <section className="px-8 md:px-16 lg:px-20 py-24 md:py-32 text-center bg-background">
        <FadeIn className="max-w-2xl mx-auto flex flex-col items-center gap-8">
          <div className="w-px h-14 bg-gradient-to-b from-transparent to-olive" aria-hidden="true" />
          <h2 className="font-playfair leading-tight" style={{ fontSize: "clamp(28px, 4vw, 48px)" }}>
            <span className="font-normal text-text-primary block">{contact.titleLine1}</span>
            <span className="italic text-olive block">{contact.titleLine2}</span>
          </h2>
          <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(16px, 1.3vw, 19px)" }}>
            {contact.subtitle}
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-barlow-condensed text-sm tracking-widest uppercase px-10 py-4 bg-terracotta text-background font-semibold hover:bg-text-primary transition-colors duration-200"
          >
            {waLabel}
          </a>
        </FadeIn>
      </section>

      <Footer dict={dict} locale={locale} />
    </main>
  );
}
