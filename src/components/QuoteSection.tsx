import Image from "next/image";
import FadeIn from "./FadeIn";
import Parallax from "./Parallax";
import type { LocaleDict } from "@/types/locale";

interface Props {
  dict: LocaleDict;
}

export default function QuoteSection({ dict }: Props) {
  const { quote } = dict;

  return (
    <section className="relative w-full overflow-hidden py-32 md:py-48 px-8 md:px-16 lg:px-20 border-t border-cream-line">
      {/* Fundo em parallax */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Parallax
          className="absolute inset-0"
          innerClassName="absolute -inset-y-[18%] inset-x-0"
          distance={80}
        >
          <Image
            src="/images/couple.jpg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </Parallax>
        {/* Véu creme para legibilidade + fade nas bordas */}
        <div className="absolute inset-0 bg-background-soft/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-background-soft via-background-soft/70 to-background-soft" />
      </div>

      <FadeIn className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-7">
        <div className="w-12 h-px bg-rose-accent" aria-hidden="true" />
        <blockquote
          className="font-playfair italic text-text-primary leading-tight text-balance"
          style={{ fontSize: "clamp(26px, 3.2vw, 44px)" }}
        >
          &ldquo;{quote.text}&rdquo;
        </blockquote>
        <p className="font-barlow-condensed text-[11px] tracking-[0.3em] text-text-secondary uppercase">
          {quote.attribution}
        </p>
      </FadeIn>
    </section>
  );
}
