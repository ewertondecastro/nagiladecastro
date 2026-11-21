"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

// ─── Peças compartilhadas do visual novo ─────────────────────────────
// Usadas pela home e por todas as páginas: cores, fontes, estrela da
// marca, botão, menu e rodapé.

export const C = {
  cream: "#F4EFE6",
  cream2: "#ECE6D8",
  ink: "#2D241E",
  inkSoft: "#5F564A",
  olive: "#3B4A3D",
  terracotta: "#B85C38",
  amber: "#D4A84B",
  petrol: "#0B4B5A",
  plum: "#6A3D5C",
};

export const display = "font-[family-name:var(--font-v2-display)]";
export const sans = "font-[family-name:var(--font-v2-sans)]";
export const heavy = "font-[family-name:var(--font-v2-bold)]";
export const eyebrow = `${sans} text-[11px] font-semibold tracking-[0.3em] uppercase`;

const EASE = [0.22, 1, 0.36, 1] as const;

// Revela o conteúdo quando ele chega na tela. Confere a posição a cada
// rolagem, então nada fica escondido se a pessoa pular direto para uma
// seção pelo menu.
export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 36,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const check = () => {
      const el = ref.current;
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        setShown(true);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [shown]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`w-4 h-4 shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Estrela de oito pontas da marca (estrela de Belém: caminho, direção).
export function Spark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/images/brand/star-mark.png"
      alt=""
      aria-hidden="true"
      className={`object-contain ${className}`}
    />
  );
}

export function Button({
  href,
  children,
  color,
  textColor = C.cream,
  external = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  color: string;
  textColor?: string;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${sans} group inline-flex items-center justify-between gap-5 rounded-full pl-7 pr-6 py-[17px] text-[12px] font-semibold tracking-[0.14em] uppercase transition-[filter,transform] duration-300 hover:brightness-110 active:scale-[0.99] ${className}`}
      style={{ background: color, color: textColor }}
    >
      <span>{children}</span>
      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

// ─── Navegação ───────────────────────────────────────────────────────
export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const path = (usePathname() || "/").replace(/\/+$/, "") || "/";
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/consultorias/sono", label: "Sono" },
    { href: "/consultorias/educacao-parental", label: "Educação Parental" },
    { href: "/sobre", label: "Sobre" },
    { href: "/recursos", label: "Recursos" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        solid || open
          ? "bg-[#F4EFE6]/90 backdrop-blur-md border-b border-[#2D241E]/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 h-[68px] flex items-center justify-between text-[#2D241E]">
        <Link href="/" className="flex items-center gap-2">
          <Spark className="w-[22px] h-[22px]" />
          <span className={`${display} text-[22px] leading-none`}>Nágila Decastro</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = path === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`${sans} text-[13px] font-medium transition-colors ${
                  active
                    ? "text-[#2D241E] underline underline-offset-[6px] decoration-[#D4A84B] decoration-2"
                    : "text-[#2D241E]/70 hover:text-[#2D241E]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          className="md:hidden p-2 -mr-2"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-6 h-px bg-current mb-[7px]" />
          <span className="block w-6 h-px bg-current" />
        </button>
      </div>
      {open && (
        <nav className="md:hidden px-5 pb-8 pt-2 flex flex-col gap-4 text-[#2D241E]">
          {[{ href: "/", label: "Início" }, ...links].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`${display} text-[30px] leading-tight`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#F4EFE6] text-[#5F564A]">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <p className={`${display} text-[22px] text-[#2D241E] flex items-center gap-2`}>
          <Spark className="w-[22px] h-[22px]" />
          Nágila Decastro
        </p>
        <nav className={`${sans} flex flex-wrap gap-x-7 gap-y-3 text-[13px] font-medium`}>
          <Link href="/consultorias" className="hover:text-[#2D241E]">Consultorias</Link>
          <Link href="/sobre" className="hover:text-[#2D241E]">Sobre</Link>
          <Link href="/recursos" className="hover:text-[#2D241E]">Recursos</Link>
        </nav>
        <p className={`${sans} text-[12px]`}>2026 · Cape Cod, Massachusetts</p>
      </div>
    </footer>
  );
}

