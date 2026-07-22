import Image from "next/image";
import FadeIn from "./FadeIn";
import Parallax from "./Parallax";
import type { LocaleDict } from "@/types/locale";

interface Props {
  dict: LocaleDict;
}

export default function AboutSection({ dict }: Props) {
  const { about } = dict;

  return (
    <section className="w-full py-24 md:py-36 px-8 md:px-16 lg:px-20 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

        {/* Left: Title + photo */}
        <FadeIn direction="left" className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="w-8 h-px bg-terracotta" aria-hidden="true" />
            <h2 className="font-playfair leading-tight" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              <span className="font-normal text-text-primary block">{about.titleLine1}</span>
              <span className="font-normal text-text-primary block">{about.titleLine2}</span>
              <span className="italic text-olive block">{about.titleLine3}</span>
            </h2>
          </div>

          {/* Portrait */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-cream-line max-w-sm">
            <Parallax
              className="absolute inset-0"
              innerClassName="absolute -inset-y-[10%] inset-x-0"
              distance={34}
            >
              <Image
                src="/images/couple.jpg"
                alt="Nágila e Ewerton Decastro"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </Parallax>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-terracotta opacity-70 z-10" />
          </div>
        </FadeIn>

        {/* Right: Text */}
        <FadeIn delay={0.2} className="flex flex-col gap-5 md:pt-20">
          {about.body.map((paragraph, i) => (
            <p
              key={i}
              className={`font-barlow leading-relaxed ${
                i === about.body.length - 1
                  ? "text-text-primary font-medium"
                  : "text-text-secondary"
              }`}
              style={{ fontSize: "clamp(17px, 1.4vw, 20px)" }}
            >
              {paragraph}
            </p>
          ))}

          {/* Credentials */}
          <div className="mt-6 pt-6 border-t border-cream-line flex flex-col gap-3">
            <span className="font-barlow-condensed text-[10px] tracking-[0.3em] text-text-muted uppercase">
              {about.credentials.label}
            </span>
            <ul className="flex flex-col gap-1.5">
              {about.credentials.items.map((item, i) => (
                <li
                  key={i}
                  className="font-barlow text-text-primary leading-snug pl-3 border-l-2 border-olive"
                  style={{ fontSize: "clamp(13px, 1vw, 15px)" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Partner credit */}
          <a
            href={about.partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 inline-flex items-center gap-3 pt-6 border-t border-cream-line"
          >
            <span className="font-barlow-condensed text-[10px] tracking-[0.3em] text-text-muted uppercase">
              {about.partner.label}
            </span>
            <span className="font-playfair italic text-olive group-hover:text-text-primary transition-colors duration-300" style={{ fontSize: "clamp(17px, 1.45vw, 21px)" }}>
              {about.partner.handle}
            </span>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
