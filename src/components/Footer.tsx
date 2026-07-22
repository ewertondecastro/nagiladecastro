import Link from "next/link";
import type { LocaleDict, Locale } from "@/types/locale";

interface Props {
  dict: LocaleDict;
  locale?: Locale;
}

function prefix(locale: Locale): string {
  return locale === "pt" ? "" : `/${locale}`;
}

export default function Footer({ dict, locale = "pt" }: Props) {
  const { footer, siteNav, contact } = dict;
  const p = prefix(locale);
  const home = p || "/";

  const links = [
    { label: siteNav.home, href: home },
    { label: siteNav.about, href: `${p}/sobre` },
    { label: siteNav.mentorias, href: `${p}/mentorias` },
    { label: siteNav.recursos, href: `${p}/recursos` },
    { label: siteNav.contato, href: `${home}#contato` },
  ];

  return (
    <footer className="w-full px-8 md:px-16 lg:px-20 pt-16 pb-8 bg-olive text-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link
              href={home}
              className="font-playfair text-background hover:text-terracotta transition-colors duration-200"
              style={{ fontSize: "clamp(22px, 2vw, 28px)" }}
            >
              {footer.name}
            </Link>
            <p className="font-barlow text-background/70 text-sm leading-relaxed">
              {dict.hero.tagline.join(" ")}
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-barlow-condensed text-xs tracking-[0.22em] uppercase text-background/80 hover:text-terracotta transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <span className="font-barlow-condensed text-[10px] tracking-[0.3em] uppercase text-background/45">
              Instagram
            </span>
            <a
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-playfair italic text-background hover:text-terracotta transition-colors duration-200"
              style={{ fontSize: "clamp(17px, 1.45vw, 21px)" }}
            >
              {contact.handle}
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-background/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-barlow-condensed text-[11px] tracking-[0.2em] text-background/50">
            &copy;&nbsp;{footer.copy}
          </span>
          <span className="font-barlow-condensed text-[11px] tracking-[0.2em] text-background/50 uppercase">
            Cape Cod &middot; Massachusetts
          </span>
        </div>
      </div>
    </footer>
  );
}
