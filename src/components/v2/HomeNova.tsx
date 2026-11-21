"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { whatsAppUrl } from "@/lib/whatsapp";
import type { ConsultoriaCard } from "@/types/locale";

// ─── Home nova (em teste) ────────────────────────────────────────────
// Base clara e acolhedora (creme), com faixas de cor para chamar atenção.
// Cada consultoria tem a sua cor da marca: Sono em azul petróleo e
// Educação Parental em roxo ameixa. Textos sem promessa de resultado e
// sem linguagem médica. A venda continua pelo WhatsApp.

const C = {
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

const WA = {
  geral: whatsAppUrl(
    "Olá, Nágila! Vim pelo seu site e gostaria de conversar sobre a minha família."
  ),
};

const display = "font-[family-name:var(--font-v2-display)]";
const sans = "font-[family-name:var(--font-v2-sans)]";
const heavy = "font-[family-name:var(--font-v2-bold)]";
const eyebrow = `${sans} text-[11px] font-semibold tracking-[0.3em] uppercase`;

const EASE = [0.22, 1, 0.36, 1] as const;

// Revela o conteúdo quando ele chega na tela. Confere a posição a cada
// rolagem, então nada fica escondido se a pessoa pular direto para uma
// seção pelo menu.
function Reveal({
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

function Arrow({ className = "" }: { className?: string }) {
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
function Spark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/images/brand/star-mark.png"
      alt=""
      aria-hidden="true"
      className={`object-contain ${className}`}
    />
  );
}

function Button({
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
function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#sono", label: "Sono" },
    { href: "#parental", label: "Educação Parental" },
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
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`${sans} text-[13px] font-medium text-[#2D241E]/70 hover:text-[#2D241E] transition-colors`}
            >
              {l.label}
            </a>
          ))}
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
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`${display} text-[30px] leading-tight`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

// Entrada do topo feita só com CSS: aparece mesmo antes do JavaScript
// carregar, então o topo nunca fica em branco numa conexão lenta.
function HeroIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div
      className="motion-safe:animate-[heroIn_0.9s_cubic-bezier(0.22,1,0.36,1)_both]"
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

// ─── 1. Topo ─────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative bg-[#F4EFE6] text-[#2D241E] overflow-hidden pt-[100px] md:pt-[120px] pb-16 md:pb-24">
      {/* círculo suave de fundo, só para dar profundidade */}
      <div
        className="pointer-events-none absolute -right-40 top-10 w-[680px] h-[680px] rounded-full opacity-60"
        style={{ background: `radial-gradient(circle, ${C.cream2} 0%, transparent 70%)` }}
        aria-hidden="true"
      />
      <div className="relative max-w-[1320px] mx-auto px-5 md:px-10 grid md:grid-cols-12 gap-10 md:gap-8 items-center">
        <div className="md:col-span-7 relative z-10">
          <HeroIn>
            <p className={`${eyebrow} text-[#B85C38] flex items-center gap-3`}>
              <span className="h-px w-8 bg-[#B85C38]/50" />
              Consultora de sono · Educadora parental
            </p>
          </HeroIn>
          <HeroIn delay={0.08}>
            <h1 className="mt-6 leading-[0.84]">
              <span
                className={`${display} block font-normal tracking-[-0.025em]`}
                style={{ fontSize: "clamp(88px, 14vw, 212px)" }}
              >
                Nágila
              </span>
              <span
                className={`${display} block italic font-normal text-[#B85C38] tracking-[-0.01em] md:pl-[0.55em] -mt-1 md:-mt-3`}
                style={{ fontSize: "clamp(70px, 11vw, 168px)" }}
              >
                Decastro
              </span>
            </h1>
          </HeroIn>
          <HeroIn delay={0.16}>
            <p
              className={`${display} leading-[1.15] mt-8 md:mt-10 max-w-[560px]`}
              style={{ fontSize: "clamp(26px, 2.6vw, 36px)" }}
            >
              Noites em claro e filhos que não obedecem têm causa.{" "}
              <span className={`${heavy} font-extrabold italic text-[#B85C38]`}>E têm solução.</span>
            </p>
          </HeroIn>
          <HeroIn delay={0.22}>
            <p className={`${sans} text-[16px] leading-[1.7] text-[#5F564A] mt-5 max-w-[500px]`}>
              Sou mãe da Helena e da Catharina. Eu sei o que você está vivendo,
              porque também vivi.
            </p>
          </HeroIn>
          <HeroIn delay={0.3}>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Button href="#sono" color={C.petrol} external={false}>
                Meu filho não dorme
              </Button>
              <Button href="#parental" color={C.plum} external={false}>
                Meu filho não me obedece
              </Button>
            </div>
          </HeroIn>
        </div>

        <div className="md:col-span-5 relative">
          <HeroIn delay={0.12}>
            <div className="relative mx-auto max-w-[460px]">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[28px]"
                style={{ boxShadow: "0 40px 80px -40px rgba(45,36,30,0.35)" }}
              >
                <img
                  src="/images/v2/mae-meninas-abraco.jpg"
                  alt="Nágila abraçada com as filhas Helena e Catharina"
                  className="absolute inset-0 w-full h-full object-cover object-[42%_35%]"
                />
              </div>
              {/* selo circular girando */}
              <div className="absolute -left-6 md:-left-12 bottom-10 w-[118px] h-[118px] md:w-[136px] md:h-[136px] rounded-full bg-[#F4EFE6] shadow-[0_10px_30px_-10px_rgba(45,36,30,0.3)] flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_22s_linear_infinite] motion-reduce:animate-none">
                  <defs>
                    <path id="selo" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                  </defs>
                  <text className={sans} fontSize="7.2" letterSpacing="1" fill={C.ink}>
                    <textPath href="#selo" textLength="228" lengthAdjust="spacing">MÃE · EDUCADORA · CONSULTORA · MÃE · EDUCADORA · CONSULTORA ·</textPath>
                  </text>
                </svg>
                <Spark className="w-9 h-9" />
              </div>
            </div>
          </HeroIn>
        </div>
      </div>
    </section>
  );
}

// ─── 2. Faixa de palavras ────────────────────────────────────────────
function Ticker() {
  const words = [
    "Sono infantil",
    "Rotina",
    "Limites com afeto",
    "Vínculo",
    "Autonomia",
    "Direção",
    "Casa em paz",
  ];
  const row = [...words, ...words];
  return (
    <div className="bg-[#3B4A3D] text-[#F4EFE6] overflow-hidden py-5 md:py-6" aria-hidden="true">
      <div className="flex w-max animate-[ticker_38s_linear_infinite] motion-reduce:animate-none">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span
                  className={`${
                    i % 2 === 0
                      ? `${heavy} font-black text-[24px] md:text-[32px] tracking-[-0.01em]`
                      : `${display} italic text-[28px] md:text-[36px]`
                  } px-7 md:px-10 whitespace-nowrap`}
                >
                  {w}
                </span>
                <Spark className="w-[22px] h-[22px]" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } } @keyframes heroIn { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: none } }`}</style>
    </div>
  );
}

// ─── 3. Manifesto ────────────────────────────────────────────────────
function Manifesto() {
  const lines = ["Você já leu tudo.", "Já tentou de tudo.", "E continua exausta."];
  return (
    <section className="bg-[#F4EFE6] text-[#2D241E] py-24 md:py-36">
      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        {lines.map((l, i) => (
          <Reveal key={l} delay={i * 0.1}>
            <p
              className={`${display} leading-[1.04] text-[#2D241E]/35`}
              style={{ fontSize: "clamp(38px, 6vw, 84px)" }}
            >
              {l}
            </p>
          </Reveal>
        ))}
        <Reveal delay={0.35}>
          <p
            className={`${display} leading-[1.04] mt-5 md:mt-8`}
            style={{ fontSize: "clamp(38px, 6vw, 84px)" }}
          >
            O problema não é falta de esforço.{" "}
            <span className={`${heavy} font-black italic text-[#B85C38] tracking-[-0.02em]`}>
              É falta de direção.
            </span>
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="mt-12 md:mt-16 md:ml-[40%] border-l-2 border-[#D4A84B] pl-6 md:pl-8">
            <p className={`${sans} text-[16px] md:text-[18px] leading-[1.75] text-[#5F564A]`}>
              Aqui não tem fórmula pronta nem passar a mão na cabeça. Tem um olhar
              atento para a sua família, um plano possível para a sua rotina e{" "}
              <strong className="font-semibold text-[#2D241E]">acompanhamento de perto</strong>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 3b. Direção ─────────────────────────────────────────────────────
// A palavra gigante desliza de lado conforme a pessoa rola a página.
function Direction() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-22%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-30, 60]);

  return (
    <section ref={ref} className="bg-[#ECE6D8] text-[#2D241E] overflow-hidden py-20 md:py-28">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10">
        <Reveal>
          <p className={`${eyebrow} text-[#B85C38] flex items-center gap-3`}>
            <span className="h-px w-8 bg-[#B85C38]/50" />
            A estrela da minha marca tem oito pontas
          </p>
        </Reveal>
      </div>
      <motion.div
        className="flex items-center gap-[0.18em] whitespace-nowrap mt-6 md:mt-8 pl-5 md:pl-10"
        style={reduce ? undefined : { x }}
        aria-hidden="true"
      >
        <span
          className={`${heavy} font-black leading-[0.9] tracking-[-0.04em]`}
          style={{ fontSize: "clamp(110px, 21vw, 340px)" }}
        >
          Direção
        </span>
        <motion.span
          className="inline-block shrink-0 w-[0.62em] h-[0.62em]"
          style={{ fontSize: "clamp(110px, 21vw, 340px)", ...(reduce ? {} : { rotate }) }}
        >
          <Spark className="w-full h-full" />
        </motion.span>
        <span
          className={`${display} italic text-[#B85C38] leading-[0.9]`}
          style={{ fontSize: "clamp(110px, 21vw, 340px)" }}
        >
          para a sua casa
        </span>
      </motion.div>
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 mt-10 md:mt-16 grid md:grid-cols-12">
        <Reveal className="md:col-start-6 md:col-span-6">
          <p className={`${sans} text-[16px] md:text-[18px] leading-[1.75] text-[#5F564A]`}>
            É a estrela que guia o caminho. Ela está na minha marca porque é
            isso que eu levo para cada família que acompanho:{" "}
            <strong className="font-semibold text-[#2D241E]">direção</strong>, com
            firmeza e com afeto.
          </p>
        </Reveal>
      </div>
      <h2 className="sr-only">Direção para a sua casa</h2>
    </section>
  );
}

// ─── 4. Consultorias ─────────────────────────────────────────────────
// Só o gancho (pergunta e situações) é da home. Todo o resto da
// consultoria (nome, descrição, o que inclui, formatos, botões) vem do
// dicionário, igual às páginas de consultoria.
type Service = {
  id: string;
  card: ConsultoriaCard;
  color: string;
  tint: string;
  question: React.ReactNode;
  pains: string[];
};

function buildServices(sono: ConsultoriaCard, parental: ConsultoriaCard): Service[] {
  return [
    {
      id: "sono",
      card: sono,
      color: C.petrol,
      tint: "#D9E4E5",
      question: (
        <>
          Seu filho acorda várias vezes <span className="italic">por noite?</span>
        </>
      ),
      pains: [
        "Só dorme mamando ou no colo.",
        "Dorme no colo e acorda no berço.",
        "Cada soneca depende de você.",
      ],
    },
    {
      id: "parental",
      card: parental,
      color: C.plum,
      tint: "#E8DCE3",
      question: (
        <>
          Você só é ouvida <span className="italic">quando grita?</span>
        </>
      ),
      pains: ["Você pede, ele ignora.", "Repete cinco vezes.", "Todo “não” vira discussão."],
    },
  ];
}

function ServiceBand({ s, flip }: { s: Service; flip: boolean }) {
  const c = s.card;
  const plan = c.detail.plans?.find((p) => p.highlight) ?? c.detail.plans?.[0];
  return (
    <section
      id={s.id}
      className="scroll-mt-[68px] text-[#F4EFE6] relative overflow-hidden"
      style={{ background: s.color }}
    >
      {/* número gigante de fundo */}
      <span
        className={`${display} pointer-events-none select-none absolute -top-10 md:-top-16 ${
          flip ? "left-2 md:left-6" : "right-2 md:right-6"
        } leading-none text-white/[0.06]`}
        style={{ fontSize: "clamp(220px, 32vw, 460px)" }}
        aria-hidden="true"
      >
        {c.number}
      </span>

      <div className="relative max-w-[1320px] mx-auto px-5 md:px-10 py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center [&>*]:min-w-0">
        <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
          <Reveal>
            <p className={`${eyebrow} text-[#F4EFE6]/70 flex items-center gap-3`}>
              <span className={`${display} text-[20px] tracking-normal normal-case`}>{c.number}</span>
              <span className="h-px w-8 bg-[#F4EFE6]/40" />
              {c.titleLine1} {c.titleLine2}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className={`${display} font-normal leading-[1.02] mt-6`}
              style={{ fontSize: "clamp(40px, 5.2vw, 72px)" }}
            >
              {s.question}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {s.pains.map((p) => (
                <li
                  key={p}
                  className={`${sans} text-[14px] md:text-[15px] rounded-full border border-[#F4EFE6]/30 px-4 py-2 text-[#F4EFE6]/90`}
                >
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.18}>
            <p className={`${sans} text-[16px] md:text-[17px] leading-[1.75] text-[#F4EFE6]/80 mt-8 max-w-[520px]`}>
              {c.description}
            </p>
          </Reveal>
        </div>

        <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
          <Reveal delay={0.1} y={50}>
            <div className="bg-[#F4EFE6] text-[#2D241E] rounded-[28px] p-7 md:p-9 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]">
              <p className={`${eyebrow}`} style={{ color: s.color }}>
                {plan?.name}
              </p>
              {plan?.duration && (
                <p className={`${display} text-[26px] leading-[1.15] mt-3`}>{plan.duration}</p>
              )}
              <ul className="mt-4">
                {(plan?.includes ?? []).map((it) => (
                  <li
                    key={it}
                    className={`${sans} py-3.5 text-[15px] leading-[1.45] flex gap-3 border-b border-[#2D241E]/10 last:border-0`}
                  >
                    <span
                      className="mt-[3px] w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
                      style={{ background: s.tint, color: s.color }}
                    >
                      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              {c.formats && (
                <p className={`${sans} text-[13px] text-[#5F564A] mt-4`}>{c.formats}</p>
              )}
              <div className="mt-7 flex flex-col gap-2">
                <Button href={whatsAppUrl(c.whatsappText)} color={s.color}>
                  {c.contactCta}
                </Button>
                <Link
                  href={`/consultorias/${c.slug}`}
                  className={`${sans} text-center text-[13px] font-semibold text-[#5F564A] hover:text-[#2D241E] py-3 underline underline-offset-4 decoration-[#2D241E]/20 hover:decoration-[#2D241E]/60 transition-colors`}
                >
                  {c.learnMore}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Services({ services }: { services: Service[] }) {
  return (
    <>
      <section className="bg-[#F4EFE6] text-[#2D241E] pb-16 md:pb-24">
        <div className="max-w-[1320px] mx-auto px-5 md:px-10 text-center">
          <Reveal>
            <Spark className="w-8 h-8 mx-auto" />
            <h2
              className={`${display} font-normal leading-[1.02] mt-6`}
              style={{ fontSize: "clamp(40px, 5.6vw, 80px)" }}
            >
              Por onde você quer{" "}
              <span className={`${heavy} font-black italic text-[#B85C38] tracking-[-0.02em]`}>começar?</span>
            </h2>
            <p className={`${sans} text-[16px] md:text-[17px] leading-[1.7] text-[#5F564A] mt-5 max-w-[520px] mx-auto`}>
              Duas consultorias individuais, online, pensadas para a realidade
              da sua família.
            </p>
          </Reveal>
        </div>
      </section>
      {services.map((s, i) => (
        <ServiceBand key={s.id} s={s} flip={i % 2 === 1} />
      ))}
    </>
  );
}

// ─── 5. Como funciona ────────────────────────────────────────────────
function Method() {
  const steps = [
    {
      n: "01",
      t: "Escuta",
      b: "Antes de qualquer técnica, eu escuto. Uma anamnese detalhada e um primeiro encontro para entender o seu filho, a sua rotina e a dinâmica da sua casa.",
    },
    {
      n: "02",
      t: "Plano sob medida",
      b: "Uma estratégia pensada para a sua família. Nada de protocolo genérico copiado da internet.",
    },
    {
      n: "03",
      t: "Acompanhamento de perto",
      b: "45 dias comigo pelo WhatsApp enquanto você coloca o plano em prática, com ajustes quando for preciso.",
    },
  ];
  return (
    <section id="metodo" className="bg-[#ECE6D8] text-[#2D241E] py-24 md:py-36 scroll-mt-[68px]">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10">
        <Reveal>
          <p className={`${eyebrow} text-[#B85C38]`}>Como funciona</p>
          <h2
            className={`${display} font-normal leading-[1.02] mt-5 max-w-[760px]`}
            style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
          >
            Eu não começo pela técnica. <span className="italic">Começo ouvindo você.</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mt-14 md:mt-20">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="h-full bg-[#F4EFE6] rounded-[28px] p-8 md:p-10 relative overflow-hidden">
                <span className={`${display} text-[64px] md:text-[80px] leading-none text-[#D4A84B]`}>
                  {s.n}
                </span>
                <h3 className={`${display} text-[30px] md:text-[34px] leading-[1.1] mt-6`}>{s.t}</h3>
                <p className={`${sans} text-[15px] md:text-[16px] leading-[1.75] text-[#5F564A] mt-3`}>
                  {s.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. Depoimentos ──────────────────────────────────────────────────
function Proof() {
  const quotes = [
    {
      q: "Antes, nossas noites eram muito difíceis, vários despertares e só voltava a dormir no colo ou mamando. Hoje temos muito mais tranquilidade, e o sono acontece com muito mais facilidade.",
      a: "Mãe da Anne",
    },
    {
      q: "Hoje ele tem autonomia de sono porque você ficou no meu pé. Agora já trabalho com o meu segundo filho para desenvolver a rotina ainda mais cedo.",
      a: "Kamila, mãe de dois",
    },
    {
      q: "Sim, sem choro e sem dor de cabeça. Acho que agora já virou hábito. Estamos voltando a poder ter uma vida social sem grandes impactos para ele.",
      a: "Mãe do Theo",
    },
  ];
  return (
    <section className="bg-[#F4EFE6] text-[#2D241E] py-24 md:py-36">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <Reveal className="md:col-span-8">
            <p className={`${eyebrow} text-[#B85C38]`}>O que as mães contam</p>
            <blockquote
              className={`${display} font-normal leading-[1.1] mt-6`}
              style={{ fontSize: "clamp(32px, 4.2vw, 58px)" }}
            >
              “Hoje o meu filho dorme sozinho no berço, e todo mundo dorme bem
              desde então.”
            </blockquote>
            <p className={`${sans} text-[14px] font-semibold text-[#5F564A] mt-6`}>
              Mãe de um bebê de 1 ano
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mt-14 md:mt-20">
          {quotes.map((x, i) => (
            <Reveal key={x.a} delay={i * 0.08}>
              <figure className="h-full bg-white/60 border border-[#2D241E]/10 rounded-[28px] p-7 md:p-8 flex flex-col">
                <svg viewBox="0 0 32 24" className="w-8 h-6 text-[#D4A84B]" fill="currentColor" aria-hidden="true">
                  <path d="M0 24V14C0 6 4 1 12 0l1 3c-4 1.4-6 4.3-6 8h5v13H0zm19 0V14c0-8 4-13 12-14l1 3c-4 1.4-6 4.3-6 8h5v13H19z" />
                </svg>
                <p className={`${sans} text-[16px] leading-[1.7] text-[#2D241E] mt-5 flex-1`}>{x.q}</p>
                <figcaption className="flex items-center gap-3 mt-7 pt-5 border-t border-[#2D241E]/10">
                  <span
                    className={`${display} w-10 h-10 rounded-full bg-[#ECE6D8] text-[#B85C38] text-[20px] flex items-center justify-center`}
                    aria-hidden="true"
                  >
                    {x.a.charAt(0)}
                  </span>
                  <span className={`${sans} text-[14px] font-semibold`}>{x.a}</span>
                  <span className={`${sans} text-[12px] text-[#5F564A] ml-auto`}>via WhatsApp</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <Link
              href="/consultorias"
              className={`${sans} inline-flex items-center gap-2 text-[14px] font-semibold text-[#2D241E] underline underline-offset-4 decoration-[#2D241E]/25 hover:decoration-[#2D241E]`}
            >
              Ver as conversas reais
              <Arrow />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 7. Sobre ────────────────────────────────────────────────────────
function About() {
  return (
    <section className="bg-[#ECE6D8] text-[#2D241E] py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-5 md:px-10 grid md:grid-cols-12 gap-12 md:gap-16 items-center">
        <div className="md:col-span-6 relative">
          <Reveal y={50}>
            <div className="relative">
              <div className="aspect-[3/2] overflow-hidden rounded-[28px]">
                <img
                  src="/images/v2/mae-meninas-risos.jpg"
                  alt="Nágila rindo com a Helena e a Catharina no colo"
                  className="w-full h-full object-cover object-[50%_20%]"
                />
              </div>
              <div className="absolute -bottom-12 right-3 md:-right-8 w-[48%] aspect-[3/2] overflow-hidden rounded-[20px] border-[6px] border-[#ECE6D8] shadow-[0_20px_40px_-20px_rgba(45,36,30,0.4)]">
                <img
                  src="/images/v2/familia.jpg"
                  alt="Nágila, Ewerton, Helena e Catharina"
                  className="w-full h-full object-cover object-[50%_30%]"
                />
              </div>
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-5 md:col-start-8 mt-8 md:mt-0">
          <Reveal>
            <p className={`${eyebrow} text-[#B85C38]`}>Quem caminha com você</p>
            <h2
              className={`${display} font-normal leading-[1.02] mt-5`}
              style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
            >
              Eu sei como é. <span className="italic">Eu também vivi.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className={`${sans} text-[16px] md:text-[17px] leading-[1.8] text-[#5F564A] mt-7 space-y-4`}>
              <p>
                Sou a Nágila, esposa do Ewerton e mãe da Helena e da Catharina.
                Educo minhas filhas em casa e já vivi a noite sem dormir e o dia
                inteiro repetindo a mesma coisa.
              </p>
              <p>
                Hoje acompanho mães e famílias com formação séria por trás de cada
                orientação, e um olhar que respeita a sua família, a sua fé e o seu
                filho.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["Educadora Parental Certificada", "Sono, rotina e comportamento infantil"].map((c) => (
                <span
                  key={c}
                  className={`${sans} text-[13px] font-medium rounded-full bg-[#F4EFE6] px-4 py-2`}
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-9">
              <Link
                href="/sobre"
                className={`${sans} inline-flex items-center gap-2 text-[14px] font-semibold text-[#2D241E] underline underline-offset-4 decoration-[#2D241E]/25 hover:decoration-[#2D241E]`}
              >
                Conhecer a minha história
                <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── 8. Fechamento (mantido por enquanto) ────────────────────────────
function Closing() {
  return (
    <section className="bg-[#3B4A3D] text-[#F4EFE6] py-28 md:py-44 relative overflow-hidden">
      <img
        src="/images/v2/mae-meninas-sofa.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-[50%_45%]"
      />
      <div className="absolute inset-0 bg-[#2A3529]/75" aria-hidden="true" />
      <Spark className="absolute left-[8%] top-16 w-6 h-6 text-[#D4A84B]/70" />
      <Spark className="absolute right-[10%] bottom-20 w-4 h-4 text-[#D4A84B]/50" />
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 text-center relative">
        <Reveal>
          <h2
            className={`${display} font-normal leading-[1]`}
            style={{ fontSize: "clamp(44px, 7vw, 100px)" }}
          >
            Você não precisa
            <span className="block italic text-[#E3C58B]">continuar assim.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className={`${sans} text-[16px] md:text-[18px] leading-[1.7] text-[#F4EFE6]/75 max-w-[540px] mx-auto mt-8`}>
            Me conta o que está acontecendo na sua casa. Eu te digo qual é o
            caminho e como a gente começa.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex justify-center">
            <Button href={WA.geral} color={C.terracotta}>
              Conversar no WhatsApp
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
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

export default function HomeNova({
  sono,
  parental,
}: {
  sono: ConsultoriaCard;
  parental: ConsultoriaCard;
}) {
  const services = buildServices(sono, parental);
  return (
    <main className="bg-[#F4EFE6] antialiased">
      <Nav />
      <Hero />
      <Ticker />
      <Manifesto />
      <Direction />
      <Services services={services} />
      <Method />
      <Proof />
      <About />
      <Closing />
      <Footer />
    </main>
  );
}
