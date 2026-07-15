"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { whatsAppUrl } from "@/lib/whatsapp";

// ─── Configuração (troque quando precisar) ───────────────────────────
// Deixe HOTMART_URL vazio para vender pelo WhatsApp (fluxo atual).
// Preencha com o checkout do Hotmart para usá-lo no lugar.
const HOTMART_URL = "";
const WHATSAPP_PURCHASE = whatsAppUrl(
  "Oi Nágila, vim pelo site e quero comprar o e-book Casa, Rotina e Tempo (2ª edição)."
);
const CHECKOUT_URL = HOTMART_URL || WHATSAPP_PURCHASE;
const PRICE = "R$ 19,90";
const PRICE_NOTE = "pagamento único, acesso vitalício";
// ─────────────────────────────────────────────────────────────────────

const PAGES = [
  { src: "/ebook/capa.webp", alt: "Capa do e-book Casa, Rotina e Tempo" },
  { src: "/ebook/sumario.webp", alt: "Sumário com os nove capítulos" },
  { src: "/ebook/introducao.webp", alt: "Introdução: a casa como ofício" },
  { src: "/ebook/diagnostico.webp", alt: "Diagnóstico da Casa" },
  { src: "/ebook/ferramentas.webp", alt: "Ferramentas para preencher" },
  { src: "/ebook/capitulo.webp", alt: "Um dos capítulos do e-book" },
];

const CHAPTERS = [
  { n: "01", t: "A Rotina como Âncora", s: "o ritmo que sustenta a vida" },
  { n: "02", t: "A Manhã que Decide o Dia", s: "acordar com intenção" },
  { n: "03", t: "As Pequenas Tarefas", s: "a beleza do invisível" },
  { n: "04", t: "O Sono e o Descanso", s: "o descanso da mulher e o sono da casa" },
  { n: "05", t: "Educar com Presença", s: "acolher com direção" },
  { n: "06", t: "O Casamento", s: "um jardim que se rega devagar" },
  { n: "07", t: "A Fé no Cotidiano", s: "orar enquanto se vive" },
  { n: "08", t: "Resiliência", s: "florescer entre as pedras" },
  { n: "09", t: "A Prática Diária", s: "do papel para a vida" },
];

const TOOLS = [
  "Diagnóstico da casa",
  "Não-negociáveis da família",
  "Âncoras da manhã",
  "Blocos do dia",
  "Rotina da noite",
  "Revisão semanal",
  "Plano de 7 dias",
];

const FAQ = [
  {
    q: "Como recebo o e-book?",
    a: "Depois da compra você recebe o arquivo em PDF, direto no seu contato. É digital: sem espera e sem frete.",
  },
  {
    q: "Consigo ler no celular?",
    a: "Sim. O PDF abre em qualquer celular, tablet ou computador. Você lê onde e quando quiser.",
  },
  {
    q: "As ferramentas dá para preencher?",
    a: "Dá. Você pode responder direto na tela ou imprimir as páginas de exercícios e escrever à mão.",
  },
  {
    q: "Preciso ser homeschooler para aproveitar?",
    a: "Não. O guia é para qualquer mãe que quer sair do improviso e devolver ritmo e paz à casa.",
  },
  {
    q: "Tem base cristã?",
    a: "Tem. O caminho é prático e afetuoso, ancorado em fé, sem imposição e sem julgamento.",
  },
];

function CtaButton({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center font-barlow-condensed text-sm tracking-[0.2em] uppercase px-10 py-4 bg-rose-accent text-background font-semibold hover:bg-text-primary transition-colors duration-300 shadow-lg shadow-rose-accent/20"
    >
      {children}
    </a>
  );
}

function TrustRow() {
  return (
    <p className="font-barlow text-[12px] text-text-muted flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
      <span>2ª edição revista e ampliada</span>
      <span className="text-rose-accent">·</span>
      <span>Entrega imediata em PDF</span>
      <span className="text-rose-accent">·</span>
      <span>{PRICE}</span>
    </p>
  );
}

function FloatingPage({
  src,
  alt,
  progress,
  yRange,
  rotate,
  className,
}: {
  src: string;
  alt: string;
  progress: MotionValue<number>;
  yRange: [number, number];
  rotate: number;
  className?: string;
}) {
  const y = useTransform(progress, [0, 1], yRange);
  return (
    <motion.img
      src={src}
      alt={alt}
      style={{ y, rotate }}
      className={`absolute rounded-[10px] shadow-2xl shadow-text-primary/30 ring-1 ring-cream-line ${className ?? ""}`}
      draggable={false}
    />
  );
}

export default function SalesPageEbook() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroSmooth = useSpring(heroProgress, { stiffness: 70, damping: 22, mass: 0.6 });

  const galleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: galProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });
  const galX = useTransform(galProgress, [0, 1], ["4%", "-32%"]);
  const galXSmooth = useSpring(galX, { stiffness: 60, damping: 24 });

  const fade = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <main className="w-full overflow-x-hidden bg-background text-text-primary">
      {/* ───────── HERO ───────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20 text-center overflow-hidden"
      >
        <motion.div
          className="relative z-20 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-barlow-condensed text-[11px] tracking-[0.35em] uppercase text-rose-accent mb-5">
            E-book · 2ª edição revista e ampliada
          </span>
          <h1
            className="font-playfair leading-[1.05] max-w-3xl"
            style={{ fontSize: "clamp(36px, 6.5vw, 70px)" }}
          >
            <span className="font-bold block text-text-primary">Saia do improviso.</span>
            <span className="italic block text-rose-accent">Devolva ritmo e paz ao seu lar.</span>
          </h1>
          <p
            className="font-barlow text-text-secondary leading-relaxed mt-6 max-w-xl mx-auto"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)" }}
          >
            O guia prático e afetuoso para a mãe que vive correndo atrás do
            próprio dia. Diagnóstico da casa, nove capítulos, ferramentas para
            preencher e um plano de 7 dias para recomeçar.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <CtaButton>Quero o e-book</CtaButton>
            <TrustRow />
          </div>
        </motion.div>

        {/* Livro: capa na frente, páginas atrás */}
        <motion.div
          className="relative mt-14 w-full max-w-md h-[260px] md:h-[320px]"
          style={{ perspective: "1200px" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <FloatingPage
            src={PAGES[1].src} alt={PAGES[1].alt} progress={heroSmooth}
            yRange={[0, -40]} rotate={-12}
            className="left-[14%] top-6 w-[38%] max-w-[170px]"
          />
          <FloatingPage
            src={PAGES[3].src} alt={PAGES[3].alt} progress={heroSmooth}
            yRange={[0, -75]} rotate={12}
            className="right-[14%] top-6 w-[38%] max-w-[170px]"
          />
          <FloatingPage
            src={PAGES[0].src} alt={PAGES[0].alt} progress={heroSmooth}
            yRange={[0, -55]} rotate={0}
            className="left-1/2 -translate-x-1/2 top-0 z-10 w-[44%] max-w-[200px]"
          />
        </motion.div>
      </section>

      {/* ───────── DOR ───────── */}
      <section className="px-6 py-24 md:py-32 bg-background-soft">
        <motion.div {...fade} className="max-w-2xl mx-auto text-center">
          <div className="w-10 h-px bg-rose-accent mx-auto mb-8" />
          <p
            className="font-playfair italic text-text-primary leading-snug mb-6"
            style={{ fontSize: "clamp(23px, 3.2vw, 37px)" }}
          >
            O dia começa antes de você decidir como ele vai ser.
          </p>
          <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            A casa corre atrás de si mesma, as tarefas se acumulam, o cansaço
            chega antes da noite e fica sempre a sensação de improviso. Se é
            assim, este e-book foi escrito para você.
          </p>
        </motion.div>
      </section>

      {/* ───────── A VIRADA ───────── */}
      <section className="px-6 py-28 md:py-36">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
            A virada
          </span>
          <p
            className="font-playfair text-text-primary leading-snug mt-4"
            style={{ fontSize: "clamp(24px, 3.4vw, 40px)" }}
          >
            O que muda uma casa não é fazer mais. É fazer o essencial, na ordem
            certa, de um jeito que caiba na vida real que você tem hoje.
          </p>
        </motion.div>
      </section>

      {/* ───────── O QUE VOCÊ VAI ENCONTRAR ───────── */}
      <section className="px-6 py-28 md:py-36 bg-background-soft">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
            O que você vai encontrar
          </span>
          <h2 className="font-playfair font-normal mt-3 mb-4" style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}>
            Nove capítulos,<br />um caminho completo
          </h2>
          <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}>
            Da rotina à fé no cotidiano. Cada capítulo termina em prática, com
            uma ferramenta para você preencher e aplicar já na próxima manhã.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {CHAPTERS.map((c, i) => (
            <motion.div
              key={c.n}
              className="flex gap-4 items-baseline border-b border-cream-line pb-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.06 }}
            >
              <span className="font-playfair italic text-rose-accent/70 text-lg shrink-0 w-8">{c.n}</span>
              <div>
                <h3 className="font-barlow font-semibold text-text-primary text-[17px] leading-tight">{c.t}</h3>
                <p className="font-barlow text-text-secondary text-[14px] mt-0.5">{c.s}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────── NÃO É SÓ LEITURA, É PRÁTICA ───────── */}
      <section className="px-6 py-28 md:py-36">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-14">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
            Não é só leitura
          </span>
          <h2 className="font-playfair font-normal mt-3 mb-4" style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}>
            Um guia para preencher e viver
          </h2>
          <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}>
            Você começa com um diagnóstico honesto da sua casa e termina com um
            plano de 7 dias. No meio, ferramentas simples que saem do papel para
            a vida real.
          </p>
        </motion.div>
        <motion.ul {...fade} className="max-w-3xl mx-auto flex flex-wrap justify-center gap-x-3 gap-y-3">
          {TOOLS.map((t) => (
            <li key={t} className="font-barlow-condensed text-[11px] tracking-[0.15em] uppercase text-text-secondary border border-cream-line rounded-full px-4 py-1.5">
              {t}
            </li>
          ))}
        </motion.ul>
      </section>

      {/* ───────── GALERIA 3D ───────── */}
      <section ref={galleryRef} className="py-24 md:py-32 bg-background-soft overflow-hidden">
        <motion.h2 {...fade} className="font-playfair font-normal text-center mb-14 px-6" style={{ fontSize: "clamp(28px, 4vw, 46px)" }}>
          Por dentro do e-book
        </motion.h2>
        <motion.div style={{ x: galXSmooth, perspective: "1000px" }} className="flex gap-6 md:gap-8 pl-[6vw] w-max">
          {PAGES.map((p, i) => (
            <div key={p.src} className="shrink-0 w-[200px] md:w-[240px]" style={{ transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)` }}>
              <img src={p.src} alt={p.alt} className="w-full rounded-[10px] shadow-2xl shadow-text-primary/25 ring-1 ring-cream-line" draggable={false} />
            </div>
          ))}
        </motion.div>
      </section>

      {/* ───────── PRA QUEM É ───────── */}
      <section className="px-6 py-28 md:py-36">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="font-playfair font-normal" style={{ fontSize: "clamp(28px, 4vw, 46px)" }}>
            Para a mulher que volta<br />para casa todos os dias
          </h2>
        </motion.div>
        <div className="max-w-2xl mx-auto flex flex-col gap-4 font-barlow text-text-secondary leading-relaxed text-center" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
          <motion.p {...fade}>Para a mãe cansada de acordar sem saber por onde começar.</motion.p>
          <motion.p {...fade}>Para quem quer ritmo e leveza, sem virar escrava de uma rotina rígida.</motion.p>
          <motion.p {...fade}>Para a casa que quer direção, presença e paz, mesmo na semana cheia.</motion.p>
        </div>
      </section>

      {/* ───────── AUTORIDADE ───────── */}
      <section className="px-6 py-24 md:py-28 bg-background-soft">
        <motion.div {...fade} className="max-w-2xl mx-auto text-center">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
            Quem escreve para você
          </span>
          <p className="font-playfair italic text-text-primary leading-snug mt-4" style={{ fontSize: "clamp(22px, 3vw, 34px)" }}>
            Não escrevo como quem já chegou, mas como quem está no caminho e
            aprendeu algumas coisas que funcionam de verdade.
          </p>
          <p className="font-barlow text-text-secondary leading-relaxed mt-5" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Nágila Decastro, autora e mentora, mãe que já viveu a casa no
            improviso e reaprendeu a conduzi-la. Menos teoria bonita, mais o que
            dá para começar a fazer amanhã de manhã.
          </p>
        </motion.div>
      </section>

      {/* ───────── OFERTA ───────── */}
      <section className="px-6 py-32 md:py-40 text-center">
        <motion.div {...fade} className="max-w-xl mx-auto">
          <div className="w-10 h-px bg-rose-accent mx-auto mb-8" />
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
            Comece hoje
          </span>
          <h2 className="font-playfair leading-tight mt-3 mb-6" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>
            <span className="font-bold block text-text-primary">Casa, Rotina & Tempo</span>
            <span className="italic block text-rose-accent">o guia completo</span>
          </h2>

          <ul className="text-left max-w-sm mx-auto mb-9 flex flex-col gap-2.5">
            {[
              "Nove capítulos práticos e reflexivos",
              "Diagnóstico da casa para saber por onde começar",
              "Ferramentas para preencher e aplicar",
              "Plano de 7 dias para recomeçar",
              "2ª edição revista e ampliada",
              "Arquivo digital em PDF, seu para sempre",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 font-barlow text-text-secondary text-[15px] leading-snug">
                <span className="text-rose-accent mt-0.5 shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="font-playfair text-text-primary mb-1" style={{ fontSize: "clamp(44px, 6vw, 64px)" }}>
            {PRICE}
          </div>
          <p className="font-barlow text-text-muted text-sm mb-9">{PRICE_NOTE}</p>

          <div className="flex flex-col items-center gap-4">
            <CtaButton>Quero o e-book agora</CtaButton>
            <TrustRow />
            <p className="font-barlow text-[13px] text-text-secondary max-w-md mt-2">
              Produto digital: nenhum material físico é enviado. Você recebe o
              PDF e lê no celular, tablet ou computador.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="px-6 py-24 md:py-32 bg-background-soft">
        <motion.h2 {...fade} className="font-playfair font-normal text-center mb-14" style={{ fontSize: "clamp(28px, 4vw, 46px)" }}>
          Perguntas frequentes
        </motion.h2>
        <div className="max-w-2xl mx-auto flex flex-col divide-y divide-cream-line border-y border-cream-line">
          {FAQ.map((item, i) => (
            <motion.div
              key={item.q}
              className="py-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <h3 className="font-barlow font-semibold text-text-primary text-[17px] mb-2">{item.q}</h3>
              <p className="font-barlow text-text-secondary leading-relaxed text-[15px]">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────── CTA FINAL ───────── */}
      <section className="px-6 py-32 md:py-40 text-center">
        <motion.div {...fade} className="max-w-xl mx-auto">
          <h2 className="font-playfair leading-tight mb-5" style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}>
            <span className="font-bold block text-text-primary">Sua casa merece</span>
            <span className="italic block text-rose-accent">direção, ritmo e paz</span>
          </h2>
          <p className="font-barlow text-text-secondary leading-relaxed mb-8" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Você recebe agora e a primeira manhã diferente pode ser amanhã.
          </p>
          <div className="flex flex-col items-center gap-3">
            <CtaButton>Quero o e-book por {PRICE}</CtaButton>
            <TrustRow />
          </div>
        </motion.div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="px-6 py-14 border-t border-cream-line text-center">
        <span className="font-barlow-condensed text-[11px] tracking-[0.4em] uppercase text-text-secondary">
          Nágila Decastro
        </span>
      </footer>
    </main>
  );
}
