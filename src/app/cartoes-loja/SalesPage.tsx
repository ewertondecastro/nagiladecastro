"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

// ─── Configuração (troque quando o Hotmart estiver pronto) ───────────
const HOTMART_URL = "#"; // <-- cole aqui o link de checkout do Hotmart
const PRICE = "R$ 27";
const PRICE_NOTE = "pagamento único, acesso vitalício";
// ─────────────────────────────────────────────────────────────────────

const SCENES = [
  { src: "/cartoes/cena-passaro.webp", alt: "Cartão: Helena viu um pássaro no jardim" },
  { src: "/cartoes/cena-perfumada.webp", alt: "Cartão: Helena cheirou uma flor perfumada" },
  { src: "/cartoes/cena-borboleta.webp", alt: "Cartão: Helena encontrou uma borboleta" },
  { src: "/cartoes/cena-feliz.webp", alt: "Cartão: Helena ficou feliz e contente" },
  { src: "/cartoes/cena-morango.webp", alt: "Cartão: Helena comeu um morango" },
];

const CONCEPTS = [
  { src: "/cartoes/conceito-substantivo.webp", label: "Substantivo" },
  { src: "/cartoes/conceito-verbo.webp", label: "Verbo" },
  { src: "/cartoes/conceito-adverbio.webp", label: "Advérbio" },
  { src: "/cartoes/conceito-antonimos.webp", label: "Antônimos" },
  { src: "/cartoes/conceito-maiuscula.webp", label: "Pontuação" },
];

const TOPICS = [
  "Substantivo", "Verbo", "Adjetivo", "Artigo", "Pronome",
  "Advérbio", "Numeral", "Antônimos", "Sinônimos", "Nome próprio",
  "Singular e plural", "Passado, presente e futuro", "Frase",
  "Maiúscula e ponto final", "Ponto de interrogação",
  "Acentuação", "Til e cedilha", "Sílaba tônica", "Sujeito", "Advérbios de lugar",
];

function CtaButton({ children, block = false }: { children: React.ReactNode; block?: boolean }) {
  return (
    <a
      href={HOTMART_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${block ? "flex w-full" : "inline-flex"} items-center justify-center font-barlow-condensed text-sm tracking-[0.2em] uppercase px-10 py-4 bg-rose-accent text-background font-semibold hover:bg-text-primary transition-colors duration-300 shadow-lg shadow-rose-accent/20`}
    >
      {children}
    </a>
  );
}

// Cartão com leve tilt 3D controlado por um MotionValue de scroll.
function FloatingCard({
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
      className={`absolute w-[44%] max-w-[280px] rounded-[14px] shadow-2xl shadow-text-primary/25 ring-1 ring-cream-line ${className ?? ""}`}
      draggable={false}
    />
  );
}

export default function SalesPage() {
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
  const galX = useTransform(galProgress, [0, 1], ["4%", "-30%"]);
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
          <span className="font-barlow-condensed text-[11px] tracking-[0.4em] uppercase text-rose-accent mb-5">
            Alfabetização com leveza
          </span>
          <h1
            className="font-playfair leading-[1.05] max-w-3xl"
            style={{ fontSize: "clamp(34px, 6.5vw, 68px)" }}
          >
            <span className="font-bold block text-text-primary">Cartões de Português</span>
            <span className="italic block text-rose-accent">para os Pequenos</span>
          </h1>
          <p
            className="font-barlow text-text-secondary leading-relaxed mt-6 max-w-xl mx-auto"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)" }}
          >
            80 cartões ilustrados para ensinar seu filho a ler, escrever e amar
            as palavras. Imprima, recorte, plastifique e aprenda brincando.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <CtaButton>Quero os cartões</CtaButton>
            <span className="font-barlow text-[12px] text-text-muted">
              Material digital para imprimir em casa
            </span>
          </div>
        </motion.div>

        {/* Leque de cartões abaixo do texto */}
        <motion.div
          className="relative mt-14 w-full max-w-md h-[240px] md:h-[300px]"
          style={{ perspective: "1200px" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <FloatingCard
            src={SCENES[1].src} alt={SCENES[1].alt} progress={heroSmooth}
            yRange={[0, -40]} rotate={-14}
            className="left-[8%] top-6 w-[42%] max-w-[190px]"
          />
          <FloatingCard
            src={SCENES[2].src} alt={SCENES[2].alt} progress={heroSmooth}
            yRange={[0, -70]} rotate={14}
            className="right-[8%] top-6 w-[42%] max-w-[190px]"
          />
          <FloatingCard
            src={SCENES[0].src} alt={SCENES[0].alt} progress={heroSmooth}
            yRange={[0, -55]} rotate={0}
            className="left-1/2 -translate-x-1/2 top-0 z-10 w-[46%] max-w-[210px]"
          />
        </motion.div>
      </section>

      {/* ───────── PROMESSA ───────── */}
      <section className="px-6 py-28 md:py-36 bg-background-soft">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center">
          <div className="w-10 h-px bg-rose-accent mx-auto mb-8" />
          <p
            className="font-playfair italic text-text-primary leading-snug"
            style={{ fontSize: "clamp(24px, 3.4vw, 40px)" }}
          >
            Cada palavra vira uma pequena história. E cada história, um convite
            pra criança querer aprender mais.
          </p>
        </motion.div>
      </section>

      {/* ───────── O QUE TEM DENTRO ───────── */}
      <section className="px-6 py-28 md:py-36">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
            O que tem dentro
          </span>
          <h2 className="font-playfair font-normal mt-3 mb-4" style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}>
            80 cartões, 20 temas,<br />uma jornada completa
          </h2>
          <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}>
            Das primeiras palavras à gramática, cada dupla traz uma cena pra
            observar e um conceito pra descobrir, com um desafio no fim.
          </p>
        </motion.div>

        <div
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6"
          style={{ perspective: "1400px" }}
        >
          {CONCEPTS.map((c, i) => (
            <motion.figure
              key={c.src}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 60, rotateX: 18 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={c.src}
                alt={`Cartão de ${c.label}`}
                className="w-full rounded-[12px] shadow-xl shadow-text-primary/15 ring-1 ring-cream-line"
                draggable={false}
              />
              <figcaption className="font-barlow-condensed text-[11px] tracking-[0.25em] uppercase text-text-secondary mt-3">
                {c.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.ul
          {...fade}
          className="max-w-4xl mx-auto mt-14 flex flex-wrap justify-center gap-x-3 gap-y-3"
        >
          {TOPICS.map((t) => (
            <li
              key={t}
              className="font-barlow-condensed text-[11px] tracking-[0.15em] uppercase text-text-secondary border border-cream-line rounded-full px-4 py-1.5"
            >
              {t}
            </li>
          ))}
        </motion.ul>
      </section>

      {/* ───────── GALERIA 3D (scroll horizontal) ───────── */}
      <section ref={galleryRef} className="py-24 md:py-32 bg-background-soft overflow-hidden">
        <motion.h2
          {...fade}
          className="font-playfair font-normal text-center mb-14 px-6"
          style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
        >
          Feitos para encantar
        </motion.h2>
        <motion.div
          style={{ x: galXSmooth, perspective: "1000px" }}
          className="flex gap-6 md:gap-8 pl-[6vw] w-max"
        >
          {[...SCENES, ...CONCEPTS.map((c) => ({ src: c.src, alt: c.label }))].map((c, i) => (
            <div
              key={c.src}
              className="shrink-0 w-[220px] md:w-[260px]"
              style={{ transform: `rotate(${i % 2 === 0 ? -4 : 4}deg)` }}
            >
              <img
                src={c.src}
                alt={c.alt}
                className="w-full rounded-[12px] shadow-2xl shadow-text-primary/20 ring-1 ring-cream-line"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </section>

      {/* ───────── COMO USAR ───────── */}
      <section className="px-6 py-28 md:py-36">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
            Simples assim
          </span>
          <h2 className="font-playfair font-normal mt-3" style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}>
            Como usar em casa
          </h2>
        </motion.div>
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3">
          {[
            { n: "01", t: "Imprima", d: "Em papel comum ou um pouco mais grosso, na sua impressora de casa." },
            { n: "02", t: "Recorte e plastifique", d: "Recorte nas linhas e plastifique para os cartões durarem muito tempo." },
            { n: "03", t: "Brinque e aprenda", d: "Um cartão por dia, no ritmo da criança, sem pressa e com afeto." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <span className="font-playfair italic text-rose-accent" style={{ fontSize: "clamp(34px, 4vw, 48px)" }}>
                {s.n}
              </span>
              <h3 className="font-barlow font-semibold text-text-primary text-lg mt-2 mb-2">{s.t}</h3>
              <p className="font-barlow text-text-secondary leading-relaxed text-[15px]">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────── PRA QUEM É ───────── */}
      <section className="px-6 py-24 md:py-28 bg-background-soft">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair font-normal mb-8" style={{ fontSize: "clamp(28px, 4vw, 46px)" }}>
            Pra quem é
          </h2>
          <div className="flex flex-col gap-4 font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            <p>Mães e pais que educam em casa e querem material sério, bonito e pronto pra usar.</p>
            <p>Crianças de 4 a 8 anos começando a ler e escrever.</p>
            <p>Famílias que acreditam que aprender e brincar caminham juntos.</p>
          </div>
        </motion.div>
      </section>

      {/* ───────── OFERTA / CTA ───────── */}
      <section className="px-6 py-32 md:py-40 text-center">
        <motion.div {...fade} className="max-w-xl mx-auto">
          <div className="w-10 h-px bg-rose-accent mx-auto mb-8" />
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
            Leve para a sua casa
          </span>
          <h2 className="font-playfair leading-tight mt-3 mb-6" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>
            <span className="font-bold block text-text-primary">80 cartões para</span>
            <span className="italic block text-rose-accent">imprimir e brincar</span>
          </h2>
          <div className="font-playfair text-text-primary mb-1" style={{ fontSize: "clamp(40px, 6vw, 60px)" }}>
            {PRICE}
          </div>
          <p className="font-barlow text-text-muted text-sm mb-9">{PRICE_NOTE}</p>
          <div className="flex flex-col items-center gap-4">
            <CtaButton>Comprar agora</CtaButton>
            <p className="font-barlow text-[13px] text-text-secondary max-w-sm">
              Material digital em PDF. Você baixa e imprime quantas vezes quiser,
              para todos os seus filhos.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="px-6 py-14 border-t border-cream-line text-center">
        <span className="font-barlow-condensed text-[11px] tracking-[0.4em] uppercase text-text-secondary">
          Nagila Decastro
        </span>
      </footer>
    </main>
  );
}
