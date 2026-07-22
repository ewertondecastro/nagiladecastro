import FadeIn from "./FadeIn";
import ContactForm from "./ContactForm";
import type { LocaleDict } from "@/types/locale";

interface Props {
  dict: LocaleDict;
}

export default function ContactSection({ dict }: Props) {
  const { contact } = dict;

  return (
    <section id="contato" className="w-full py-28 md:py-40 px-8 md:px-16 lg:px-20 bg-background scroll-mt-16">
      <FadeIn className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-olive" aria-hidden="true" />

        <h2 className="font-playfair leading-tight" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
          <span className="font-normal text-text-primary block">{contact.titleLine1}</span>
          <span className="italic text-olive block">{contact.titleLine2}</span>
        </h2>

        <p className="font-barlow text-text-secondary leading-relaxed max-w-xl" style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}>
          {contact.subtitle}
        </p>
      </FadeIn>

      {/* Formulário */}
      <FadeIn className="max-w-2xl mx-auto mt-14">
        <div className="text-center mb-8">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-olive">
            {contact.formEyebrow}
          </span>
          <h3 className="font-playfair text-text-primary mt-2" style={{ fontSize: "clamp(24px, 3vw, 34px)" }}>
            {contact.formTitle}
          </h3>
        </div>
        <ContactForm dict={dict} />
      </FadeIn>

      {/* DM como outra via de contato (igual ao formulário) */}
      <FadeIn className="max-w-3xl mx-auto mt-14 flex flex-col items-center gap-5 text-center">
        <div className="flex items-center gap-4 w-full max-w-xs mb-2">
          <span className="h-px flex-1 bg-cream-line" aria-hidden="true" />
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-text-muted">
            {contact.orLabel}
          </span>
          <span className="h-px flex-1 bg-cream-line" aria-hidden="true" />
        </div>
        <a
          href={contact.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 font-barlow-condensed text-sm tracking-widest uppercase px-8 py-4 border border-olive text-olive hover:bg-terracotta hover:text-background transition-colors duration-200"
        >
          {contact.cta}
        </a>
        <span className="font-playfair italic text-text-muted text-base md:text-lg">
          {contact.handle}
        </span>
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-olive" aria-hidden="true" />
      </FadeIn>
    </section>
  );
}
