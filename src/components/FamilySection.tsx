import Image from "next/image";
import FadeIn from "./FadeIn";
import type { LocaleDict } from "@/types/locale";

interface Props {
  dict: LocaleDict;
}

export default function FamilySection({ dict }: Props) {
  const { family } = dict;

  return (
    <section className="w-full bg-background-soft">
      {/* Full-width landscape family photo */}
      <FadeIn direction="none" className="relative w-full aspect-[3/2] md:aspect-[16/9] max-h-[80vh] overflow-hidden">
        <Image
          src="/images/family.jpg"
          alt="Família Decastro: Nagila, Ewerton, Helena e Catharina"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle bottom fade to blend into next-section bg */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background-soft to-transparent" />
      </FadeIn>

      {/* Caption block */}
      <div className="w-full py-20 md:py-28 px-8 md:px-16 lg:px-20">
        <FadeIn className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="w-8 h-px bg-rose-accent" aria-hidden="true" />
            <h2 className="font-playfair leading-tight" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              <span className="font-normal text-text-primary block">{family.titleLine1}</span>
              <span className="italic text-rose-accent block">{family.titleLine2}</span>
            </h2>
          </div>

          <div className="flex flex-col gap-5 max-w-2xl">
            {family.body.map((paragraph, i) => (
              <p
                key={i}
                className={`font-barlow leading-relaxed ${
                  i === family.body.length - 1
                    ? "text-text-primary font-medium"
                    : "text-text-secondary"
                }`}
                style={{ fontSize: "clamp(15px, 1.2vw, 17px)" }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
