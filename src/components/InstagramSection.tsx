import FadeIn from "./FadeIn";
import type { LocaleDict } from "@/types/locale";

interface Props {
  dict: LocaleDict;
}

export default function InstagramSection({ dict }: Props) {
  const { instagram } = dict;

  return (
    <section className="w-full py-28 md:py-40 px-8 md:px-16 lg:px-20 bg-background-soft">
      <FadeIn className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-rose-accent" aria-hidden="true" />

        <h2 className="font-playfair leading-tight" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
          <span className="font-normal text-text-primary block">{instagram.titleLine1}</span>
          <span className="italic text-rose-accent block">{instagram.titleLine2}</span>
        </h2>

        <p className="font-barlow text-text-secondary leading-relaxed max-w-xl" style={{ fontSize: "clamp(14px, 1.1vw, 17px)" }}>
          {instagram.subtitle}
        </p>

        <a
          href={instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-3"
          aria-label={instagram.cta}
        >
          <span className="font-playfair italic text-rose-accent text-2xl md:text-3xl group-hover:text-text-primary transition-colors duration-300">
            {instagram.handle}
          </span>
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] text-text-secondary uppercase group-hover:text-rose-accent transition-colors duration-300">
            {instagram.cta}
          </span>
        </a>

        <div className="w-px h-16 bg-gradient-to-t from-transparent to-rose-accent" aria-hidden="true" />
      </FadeIn>
    </section>
  );
}
