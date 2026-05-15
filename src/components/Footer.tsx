import type { LocaleDict } from "@/types/locale";

interface Props {
  dict: LocaleDict;
}

export default function Footer({ dict }: Props) {
  const { footer } = dict;

  return (
    <footer className="w-full px-8 md:px-16 lg:px-20 py-8 bg-background border-t border-cream-line">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-playfair text-text-primary" style={{ fontSize: "clamp(16px, 1.2vw, 20px)" }}>
          {footer.name}
        </span>
        <span className="font-barlow-condensed text-[11px] tracking-[0.2em] text-text-muted">
          &copy;&nbsp;{footer.copy}
        </span>
      </div>
    </footer>
  );
}
