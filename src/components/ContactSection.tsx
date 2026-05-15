import FadeIn from "./FadeIn";
import { whatsAppUrl } from "@/lib/whatsapp";
import type { LocaleDict } from "@/types/locale";

interface Props {
  dict: LocaleDict;
}

export default function ContactSection({ dict }: Props) {
  const { contact } = dict;

  return (
    <section className="w-full py-28 md:py-40 px-8 md:px-16 lg:px-20 bg-background">
      <FadeIn className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-rose-accent" aria-hidden="true" />

        <h2 className="font-playfair leading-tight" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
          <span className="font-normal text-text-primary block">{contact.titleLine1}</span>
          <span className="italic text-rose-accent block">{contact.titleLine2}</span>
        </h2>

        <p className="font-barlow text-text-secondary leading-relaxed max-w-xl" style={{ fontSize: "clamp(14px, 1.1vw, 17px)" }}>
          {contact.subtitle}
        </p>

        <a
          href={whatsAppUrl(contact.whatsappText)}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 font-barlow-condensed text-sm tracking-widest uppercase px-8 py-4 bg-rose-accent text-background font-semibold hover:bg-text-primary transition-colors duration-200"
        >
          {contact.cta}
        </a>

        <span className="font-playfair italic text-text-muted text-base md:text-lg">
          {contact.handle}
        </span>

        <div className="w-px h-16 bg-gradient-to-t from-transparent to-rose-accent" aria-hidden="true" />
      </FadeIn>
    </section>
  );
}
