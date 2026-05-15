import FadeIn from "./FadeIn";
import type { LocaleDict } from "@/types/locale";

interface Props {
  dict: LocaleDict;
}

export default function QuoteSection({ dict }: Props) {
  const { quote } = dict;

  return (
    <section className="w-full py-24 md:py-32 px-8 md:px-16 lg:px-20 bg-background-soft">
      <FadeIn className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        <div className="w-12 h-px bg-rose-accent" aria-hidden="true" />
        <blockquote className="font-playfair italic text-text-primary leading-tight text-balance" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>
          “{quote.text}”
        </blockquote>
        <p className="font-barlow-condensed text-[11px] tracking-[0.3em] text-text-secondary uppercase">
          — {quote.attribution}
        </p>
      </FadeIn>
    </section>
  );
}
