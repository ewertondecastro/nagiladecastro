"use client";

import { useRouter, usePathname } from "next/navigation";
import type { Locale } from "@/types/locale";

interface Props {
  current: Locale;
}

const locales: Locale[] = ["pt", "en", "es"];

export default function LanguageSwitcher({ current }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(locale: Locale) {
    const segments = pathname.split("/").filter(Boolean);
    const isLocaleSegment = ["pt", "en", "es"].includes(segments[0]);
    const rest = isLocaleSegment ? segments.slice(1) : segments;
    const newPath = locale === "pt" ? `/${rest.join("/")}` : `/${locale}/${rest.join("/")}`;
    router.push(newPath.replace(/\/$/, "") || "/");
  }

  return (
    <div className="flex items-center gap-3">
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-3">
          <button
            onClick={() => switchLocale(locale)}
            className={`font-barlow-condensed tracking-widest text-xs uppercase transition-colors duration-200 ${
              current === locale
                ? "text-rose-accent"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {locale.toUpperCase()}
          </button>
          {i < locales.length - 1 && (
            <span className="text-text-muted opacity-40 text-xs">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
