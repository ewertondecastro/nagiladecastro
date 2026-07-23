"use client";

import Link from "next/link";
import { useState } from "react";
import type { LocaleDict, Locale } from "@/types/locale";
import LanguageSwitcher from "./LanguageSwitcher";

function prefix(locale: Locale): string {
  return locale === "pt" ? "" : `/${locale}`;
}

export default function SiteNav({
  dict,
  locale,
}: {
  dict: LocaleDict;
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);
  const p = prefix(locale);
  const home = p || "/";

  const links = [
    { label: dict.siteNav.home, href: home, highlight: false },
    { label: dict.siteNav.about, href: `${p}/sobre`, highlight: false },
    { label: dict.siteNav.consultorias, href: `${p}/consultorias`, highlight: false },
    { label: dict.siteNav.recursos, href: `${p}/recursos`, highlight: true },
    { label: dict.siteNav.contato, href: `${home}#contato`, highlight: false },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-cream-line">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-16">
        <Link
          href={home}
          onClick={() => setOpen(false)}
          className="font-playfair text-[17px] md:text-xl text-text-primary hover:text-olive transition-colors duration-200"
        >
          {dict.footer.name}
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7 lg:gap-8">
          {links.map((l) =>
            l.highlight ? (
              <Link
                key={l.href}
                href={l.href}
                className="font-barlow-condensed text-xs tracking-[0.2em] uppercase px-4 py-2 bg-terracotta text-background font-semibold hover:bg-text-primary transition-colors duration-200"
              >
                {l.label}
              </Link>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="font-barlow-condensed text-xs tracking-[0.2em] uppercase text-text-secondary hover:text-olive transition-colors duration-200"
              >
                {l.label}
              </Link>
            )
          )}
          <span className="w-px h-4 bg-cream-line" aria-hidden="true" />
          <LanguageSwitcher current={locale} />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={dict.siteNav.menu}
          aria-expanded={open}
          className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 items-end"
        >
          <span
            className={`block h-px bg-text-primary transition-all duration-300 ${
              open ? "w-6 translate-y-[6px] rotate-45" : "w-6"
            }`}
          />
          <span
            className={`block h-px bg-text-primary transition-all duration-300 ${
              open ? "opacity-0" : "w-4"
            }`}
          />
          <span
            className={`block h-px bg-text-primary transition-all duration-300 ${
              open ? "w-6 -translate-y-[6px] -rotate-45" : "w-5"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden border-t border-cream-line bg-background/95 backdrop-blur-md transition-[max-height,opacity] duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-barlow-condensed text-sm tracking-[0.2em] uppercase py-3 border-b border-cream-line/70 ${
                l.highlight ? "text-olive font-semibold" : "text-text-secondary"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-5">
            <LanguageSwitcher current={locale} />
          </div>
        </div>
      </div>
    </header>
  );
}
