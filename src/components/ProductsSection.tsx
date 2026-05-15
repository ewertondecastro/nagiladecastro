import FadeIn from "./FadeIn";
import { whatsAppUrl } from "@/lib/whatsapp";
import type { LocaleDict, ProductItem } from "@/types/locale";

interface Props {
  dict: LocaleDict;
}

function ProductCard({ item, delay }: { item: ProductItem; delay: number }) {
  const isFree = item.kind === "free";
  return (
    <FadeIn delay={delay} className="relative flex flex-col bg-background border border-cream-line p-8 md:p-10 overflow-hidden group hover:border-rose-accent transition-colors duration-300">
      <span
        className={`inline-block self-start font-barlow-condensed text-[10px] tracking-[0.3em] uppercase px-3 py-1 mb-6 ${
          isFree
            ? "bg-rose-soft text-text-primary"
            : "bg-rose-accent text-background"
        }`}
      >
        {item.badge}
      </span>

      <h3 className="font-playfair leading-tight mb-5" style={{ fontSize: "clamp(24px, 2.2vw, 32px)" }}>
        <span className="font-bold text-text-primary block">{item.titleLine1}</span>
        <span className="italic text-rose-accent block">{item.titleLine2}</span>
      </h3>

      <p className="font-barlow text-text-secondary leading-relaxed flex-1 mb-6" style={{ fontSize: "clamp(14px, 1vw, 16px)" }}>
        {item.description}
      </p>

      <a
        href={whatsAppUrl(item.whatsappText)}
        target="_blank"
        rel="noopener noreferrer"
        className="self-start font-barlow-condensed text-xs tracking-widest uppercase px-5 py-2.5 bg-rose-accent text-background font-semibold hover:bg-text-primary transition-colors duration-200"
      >
        {item.cta}
      </a>
    </FadeIn>
  );
}

export default function ProductsSection({ dict }: Props) {
  const { products } = dict;

  return (
    <section className="w-full py-24 md:py-36 px-8 md:px-16 lg:px-20 bg-background-soft">
      <FadeIn className="mb-16 md:mb-20 max-w-3xl">
        <div className="w-8 h-px bg-rose-accent mb-6" aria-hidden="true" />
        <h2 className="font-playfair font-normal text-text-primary mb-4" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>
          {products.sectionTitle}
        </h2>
        <p className="font-barlow text-text-secondary leading-relaxed mb-3" style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}>
          {products.sectionSubtitle}
        </p>
        <p className="font-barlow-condensed text-[10px] tracking-[0.25em] text-text-muted uppercase">
          {products.placeholderNote}
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl">
        {products.items.map((item, i) => (
          <ProductCard key={i} item={item} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
