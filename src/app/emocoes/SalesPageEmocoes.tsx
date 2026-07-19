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
// Cole aqui o checkout do Hotmart deste produto (ex.: https://pay.hotmart.com/XXXXXXXXX).
// Enquanto estiver vazio, o botão cai no WhatsApp para não ficar quebrado.
const HOTMART_URL = "https://pay.hotmart.com/S106788027G";
const WHATSAPP_PURCHASE = whatsAppUrl(
  "Oi Nágila, vim pelo site e quero comprar os Flashcards das Emoções."
);
const CHECKOUT_URL = HOTMART_URL || WHATSAPP_PURCHASE;
const PRICE = "R$ 14,99";
const PRICE_NOTE = "pagamento único, acesso vitalício";
// ─────────────────────────────────────────────────────────────────────

// Frentes (cena ilustrada) usadas no herói e nas galerias
const SCENES = [
  { src: "/emocoes/alegria.webp", alt: "Cartão da emoção Alegria" },
  { src: "/emocoes/tristeza.webp", alt: "Cartão da emoção Tristeza" },
  { src: "/emocoes/raiva.webp", alt: "Cartão da emoção Raiva" },
  { src: "/emocoes/medo.webp", alt: "Cartão da emoção Medo" },
  { src: "/emocoes/calma.webp", alt: "Cartão da emoção Calma" },
];

const GALLERY = [
  "alegria", "tristeza", "raiva", "medo", "calma", "ciume",
  "surpresa", "saudade", "entusiasmo", "vergonha", "solidao", "frustracao",
].map((s) => ({ src: `/emocoes/${s}.webp`, alt: `Cartão da emoção ${s}` }));

// O método impresso no verso de cada cartão
const METHOD = [
  { k: "Percebo", d: "A criança reconhece o que o corpo sente: o coração acelera, a barriga aperta, o rosto esquenta." },
  { k: "Posso dizer", d: "Ela dá nome ao que sente, em uma frase simples que cabe na boca de criança." },
  { k: "Posso fazer", d: "Uma atitude saudável e possível para atravessar a emoção, sem engolir o que sente." },
  { k: "Não devo", d: "Um limite claro e amoroso: o que evitar quando a emoção fica grande demais." },
  { k: "Vamos praticar", d: "Um exercício concreto para treinar juntos, ali na hora, e fixar o aprendizado." },
];

const EMOTIONS = [
  "Alegria", "Alívio", "Calma", "Ciúme", "Confusão", "Culpa",
  "Decepção", "Desânimo", "Entusiasmo", "Frustração", "Medo", "Nervosismo",
  "Nojo", "Preocupação", "Raiva", "Saudade", "Solidão", "Surpresa",
  "Tristeza", "Vergonha",
];

const FAQ = [
  {
    q: "Como recebo o material?",
    a: "Na hora do pagamento, direto no seu e-mail. É digital: sem espera, sem frete, acesso imediato.",
  },
  {
    q: "Serve para qual idade?",
    a: "Ideal dos 3 aos 10 anos. Os menores exploram as cenas e as expressões; os maiores mergulham no método e nas frases para praticar.",
  },
  {
    q: "Preciso de impressora colorida?",
    a: "Fica mais bonito colorido, mas funciona em qualquer impressora. Papel comum já resolve, e papel mais grosso deixa os cartões ainda melhores.",
  },
  {
    q: "Como funciona a frente e o verso?",
    a: "Cada emoção tem uma frente com a cena ilustrada e um verso com o método. Vêm lado a lado: você imprime de um lado só, recorta e dobra ao meio.",
  },
  {
    q: "Posso imprimir mais de uma vez?",
    a: "Sim. O arquivo é seu para sempre. Imprima quantas vezes quiser, para todos os seus filhos ou para a sua turma.",
  },
  {
    q: "Tem base cristã?",
    a: "Tem. O cuidado com as emoções é ancorado na fé, com leveza e sem imposição, lembrando a criança de que ela nunca está sozinha.",
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
      <span>Acesso imediato</span>
      <span className="text-rose-accent">·</span>
      <span>Imprima quantas vezes quiser</span>
      <span className="text-rose-accent">·</span>
      <span>{PRICE} à vista</span>
    </p>
  );
}

// Cartão com leve parallax 3D controlado por um MotionValue de scroll.
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
      className={`absolute rounded-[14px] shadow-2xl shadow-text-primary/25 ring-1 ring-cream-line ${className ?? ""}`}
      draggable={false}
    />
  );
}

export default function SalesPageEmocoes() {
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
  const galX = useTransform(galProgress, [0, 1], ["4%", "-38%"]);
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
          <span className="font-barlow-condensed text-[11px] tracking-[0.25em] uppercase text-rose-accent mb-5">
            O que eu sinto, o que eu faço · Domínio Próprio
          </span>
          <h1
            className="font-playfair leading-[1.05] max-w-3xl"
            style={{ fontSize: "clamp(36px, 6.5vw, 68px)" }}
          >
            <span className="font-bold block text-text-primary">Ensine seu filho a entender</span>
            <span className="italic block text-rose-accent">o que sente por dentro</span>
          </h1>
          <p
            className="font-barlow text-text-secondary leading-relaxed mt-6 max-w-xl mx-auto"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)" }}
          >
            20 cartões ilustrados que transformam raiva, medo, ciúme e alegria em
            conversa. A criança aprende a perceber, nomear e responder a cada
            emoção, com calma e sem gritaria.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <CtaButton>Quero os cartões</CtaButton>
            <TrustRow />
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
            src={SCENES[3].src} alt={SCENES[3].alt} progress={heroSmooth}
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

      {/* ───────── DOR / EMPATIA ───────── */}
      <section className="px-6 py-24 md:py-32 bg-background-soft">
        <motion.div {...fade} className="max-w-2xl mx-auto text-center">
          <div className="w-10 h-px bg-rose-accent mx-auto mb-8" />
          <p
            className="font-playfair italic text-text-primary leading-snug mb-6"
            style={{ fontSize: "clamp(23px, 3.2vw, 36px)" }}
          >
            &ldquo;Ele explode e não sabe dizer o que está sentindo.&rdquo;
          </p>
          <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            A birra vem antes da palavra. A criança sente muito e ainda não tem
            nome para o que sente, então grita, bate a porta ou se fecha. Quando
            ela aprende a reconhecer e nomear a emoção, a casa inteira respira
            diferente.
          </p>
        </motion.div>
      </section>

      {/* ───────── COMO FUNCIONA CADA CARTÃO ───────── */}
      <section className="px-6 py-28 md:py-36">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-14">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
            Simples e afetuoso
          </span>
          <h2 className="font-playfair font-normal mt-3 mb-4" style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}>
            Como funciona cada cartão
          </h2>
          <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}>
            Uma frente com a cena que a criança reconhece na própria vida. E um
            verso com um caminho simples para atravessar a emoção, passo a passo.
          </p>
        </motion.div>

        <div
          className="max-w-2xl mx-auto grid grid-cols-2 gap-5 md:gap-8 items-center"
          style={{ perspective: "1400px" }}
        >
          <motion.figure
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: -40, rotateY: 20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src="/emocoes/alegria.webp" alt="Frente do cartão: a cena da emoção" className="w-full rounded-[12px] shadow-xl shadow-text-primary/15 ring-1 ring-cream-line" draggable={false} />
            <figcaption className="font-barlow-condensed text-[11px] tracking-[0.25em] uppercase text-text-secondary mt-3">
              Frente: a cena
            </figcaption>
          </motion.figure>
          <motion.figure
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: 40, rotateY: -20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src="/emocoes/alegria-verso.webp" alt="Verso do cartão: o método para lidar com a emoção" className="w-full rounded-[12px] shadow-xl shadow-text-primary/15 ring-1 ring-cream-line" draggable={false} />
            <figcaption className="font-barlow-condensed text-[11px] tracking-[0.25em] uppercase text-text-secondary mt-3">
              Verso: o caminho
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* ───────── O MÉTODO (5 PASSOS) ───────── */}
      <section className="px-6 py-28 md:py-36 bg-background-soft">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
            O método no verso
          </span>
          <h2 className="font-playfair font-normal mt-3 mb-4" style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}>
            Cinco passos para<br />atravessar cada emoção
          </h2>
          <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}>
            O mesmo caminho se repete em todos os cartões. A criança aprende uma
            vez e passa a usar sozinha, em qualquer sentimento.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          {METHOD.map((m, i) => (
            <motion.div
              key={m.k}
              className="flex gap-5 items-baseline bg-background border border-cream-line p-6 md:p-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
            >
              <span className="font-playfair italic text-rose-accent/70 text-2xl shrink-0 w-8">{i + 1}</span>
              <div>
                <h3 className="font-barlow-condensed tracking-[0.15em] uppercase text-text-primary text-sm font-semibold mb-1.5">{m.k}</h3>
                <p className="font-barlow text-text-secondary leading-relaxed text-[15px]">{m.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────── AS 20 EMOÇÕES ───────── */}
      <section className="px-6 py-28 md:py-36">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
            O que tem dentro
          </span>
          <h2 className="font-playfair font-normal mt-3 mb-4" style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}>
            20 emoções,<br />40 faces de conteúdo
          </h2>
          <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}>
            Das mais fáceis às mais difíceis de falar. Cada uma com sua cena, suas
            sensações no corpo e o caminho para lidar com ela.
          </p>
        </motion.div>

        <div
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
          style={{ perspective: "1400px" }}
        >
          {GALLERY.slice(0, 8).map((c, i) => (
            <motion.figure
              key={c.src}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 60, rotateX: 18 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={c.src} alt={c.alt} className="w-full rounded-[12px] shadow-xl shadow-text-primary/15 ring-1 ring-cream-line" draggable={false} />
            </motion.figure>
          ))}
        </div>

        <motion.ul {...fade} className="max-w-4xl mx-auto mt-14 flex flex-wrap justify-center gap-x-3 gap-y-3">
          {EMOTIONS.map((t) => (
            <li key={t} className="font-barlow-condensed text-[11px] tracking-[0.15em] uppercase text-text-secondary border border-cream-line rounded-full px-4 py-1.5">
              {t}
            </li>
          ))}
        </motion.ul>
      </section>

      {/* ───────── GALERIA 3D ───────── */}
      <section ref={galleryRef} className="py-24 md:py-32 bg-background-soft overflow-hidden">
        <motion.h2 {...fade} className="font-playfair font-normal text-center mb-14 px-6" style={{ fontSize: "clamp(28px, 4vw, 46px)" }}>
          Feitos para encantar
        </motion.h2>
        <motion.div style={{ x: galXSmooth, perspective: "1000px" }} className="flex gap-6 md:gap-8 pl-[6vw] w-max">
          {GALLERY.map((c, i) => (
            <div key={c.src} className="shrink-0 w-[210px] md:w-[250px]" style={{ transform: `rotate(${i % 2 === 0 ? -4 : 4}deg)` }}>
              <img src={c.src} alt={c.alt} className="w-full rounded-[12px] shadow-2xl shadow-text-primary/20 ring-1 ring-cream-line" draggable={false} />
            </div>
          ))}
        </motion.div>
      </section>

      {/* ───────── O QUE MUDA NA SUA CASA ───────── */}
      <section className="px-6 py-28 md:py-36">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-14">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
            Por que vale a pena
          </span>
          <h2 className="font-playfair font-normal mt-3" style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}>
            O que muda na sua casa
          </h2>
        </motion.div>
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
          {[
            { t: "Menos crises, mais palavras", d: "A criança aprende a dizer o que sente antes de explodir. A birra vira conversa." },
            { t: "Uma ferramenta na hora difícil", d: "No meio da crise, você pega o cartão e tem um caminho pronto para seguir com ela." },
            { t: "Autoconhecimento desde cedo", d: "Ela reconhece as próprias sensações e entende que toda emoção tem um jeito saudável de sair." },
            { t: "Você compra uma vez", d: "Imprima, plastifique e use para sempre. Serve para todos os filhos e acompanha a criança por anos." },
          ].map((b, i) => (
            <motion.div
              key={b.t}
              className="flex gap-4 bg-background-soft border border-cream-line p-6 md:p-7"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <span className="text-rose-accent font-playfair text-2xl leading-none shrink-0">✦</span>
              <div>
                <h3 className="font-barlow font-semibold text-text-primary text-base mb-1.5">{b.t}</h3>
                <p className="font-barlow text-text-secondary leading-relaxed text-[14px]">{b.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────── COMO USAR ───────── */}
      <section className="px-6 py-28 md:py-36 bg-background-soft">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
            Simples assim
          </span>
          <h2 className="font-playfair font-normal mt-3" style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}>
            Da compra ao uso em minutos
          </h2>
        </motion.div>
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3">
          {[
            { n: "01", t: "Imprima", d: "Só de um lado, em papel comum ou de maior gramatura. Tamanho real (100%) na impressora." },
            { n: "02", t: "Recorte e dobre", d: "Recorte cada cartão e dobre ao meio: frente e verso prontos, sem impressão dupla." },
            { n: "03", t: "Plastifique e use", d: "Plastifique para durar e deixe à mão para os momentos de emoção grande." },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <span className="font-playfair italic text-rose-accent" style={{ fontSize: "clamp(34px, 4vw, 48px)" }}>{s.n}</span>
              <h3 className="font-barlow font-semibold text-text-primary text-lg mt-2 mb-2">{s.t}</h3>
              <p className="font-barlow text-text-secondary leading-relaxed text-[15px]">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────── AUTORIDADE ───────── */}
      <section className="px-6 py-24 md:py-28">
        <motion.div {...fade} className="max-w-2xl mx-auto text-center">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
            Quem preparou
          </span>
          <p className="font-playfair italic text-text-primary leading-snug mt-4" style={{ fontSize: "clamp(22px, 3vw, 34px)" }}>
            Feito por Nágila Decastro, educadora parental certificada e mãe que
            educa as duas filhas em casa.
          </p>
          <p className="font-barlow text-text-secondary leading-relaxed mt-5" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            O mesmo cuidado que ela usa todos os dias com a Helena e a Catharina,
            agora pronto para a sua casa, com leveza e ancorado na fé.
          </p>
        </motion.div>
      </section>

      {/* ───────── OFERTA / ANCORAGEM ───────── */}
      <section className="px-6 py-32 md:py-40 text-center bg-background-soft">
        <motion.div {...fade} className="max-w-xl mx-auto">
          <div className="w-10 h-px bg-rose-accent mx-auto mb-8" />
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">
            Leve para a sua casa
          </span>
          <h2 className="font-playfair leading-tight mt-3 mb-6" style={{ fontSize: "clamp(32px, 5vw, 56px)" }}>
            <span className="font-bold block text-text-primary">20 cartões das emoções</span>
            <span className="italic block text-rose-accent">para imprimir em casa</span>
          </h2>

          <p className="font-barlow text-text-secondary leading-relaxed mb-8" style={{ fontSize: "clamp(15px, 1.3vw, 17px)" }}>
            Um material socioemocional pronto custa muito mais, e um dia acaba.
            Aqui você recebe o arquivo completo, imprime quantas vezes quiser,
            para todos os seus filhos, para sempre.
          </p>

          <ul className="text-left max-w-sm mx-auto mb-9 flex flex-col gap-2.5">
            {[
              "20 emoções ilustradas (40 faces de conteúdo)",
              "Método de 5 passos no verso de cada cartão",
              "Frente e verso posicionados lado a lado",
              "Sensações do corpo, frases e desafios para praticar",
              "Base cristã, leve e sem imposição",
              "Arquivo digital reutilizável, seu para sempre",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 font-barlow text-text-secondary text-[15px] leading-snug">
                <span className="text-rose-accent mt-0.5 shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <p className="font-barlow-condensed text-[11px] tracking-[0.25em] uppercase text-text-muted mb-1">
            Por menos que um lanche
          </p>
          <div className="font-playfair text-text-primary mb-1" style={{ fontSize: "clamp(44px, 6vw, 64px)" }}>
            {PRICE}
          </div>
          <p className="font-barlow text-text-muted text-sm mb-9">{PRICE_NOTE}</p>

          <div className="flex flex-col items-center gap-4">
            <CtaButton>Comprar agora</CtaButton>
            <TrustRow />
            <p className="font-barlow text-[13px] text-text-secondary max-w-md mt-2">
              Produto digital: nenhum material físico é enviado. As cores podem
              variar conforme a tela, a impressora e o papel utilizado.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="px-6 py-24 md:py-32">
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
      <section className="px-6 py-32 md:py-40 text-center bg-background-soft">
        <motion.div {...fade} className="max-w-xl mx-auto">
          <h2 className="font-playfair leading-tight mb-5" style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}>
            <span className="font-bold block text-text-primary">Dê nome ao que</span>
            <span className="italic block text-rose-accent">seu filho sente</span>
          </h2>
          <p className="font-barlow text-text-secondary leading-relaxed mb-8" style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}>
            Você baixa em minutos e a primeira conversa diferente pode ser ainda hoje.
          </p>
          <div className="flex flex-col items-center gap-3">
            <CtaButton>Quero os cartões por {PRICE}</CtaButton>
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
