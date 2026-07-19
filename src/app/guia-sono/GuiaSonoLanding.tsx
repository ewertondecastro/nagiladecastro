"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import type { LocaleDict, ProductItem } from "@/types/locale";

const SONO_ITEM: ProductItem = {
  kind: "free",
  badge: "GRATUITO",
  titleLine1: "Guia",
  titleLine2: "Primeiros 30 dias do sono",
  description: "",
  cta: "Baixar grátis",
  resourceKey: "sono",
  gated: true,
};

const FOR_WHOM = [
  "Você sente que o sono do bebê está acontecendo de qualquer jeito e quer tomar as rédeas.",
  "Já leu de tudo na internet, salvou vídeos, conversou com outras mães, e ainda segue sem um caminho claro.",
  "Quer organizar o sono respeitando o ritmo do bebê, sem treinos rígidos e sem deixar chorar sozinho.",
  "Faz pequenos ajustes soltos, mas sem entender o quadro inteiro.",
  "Quer ser a condutora consciente do sono do seu filho, não uma refém dele.",
];

const TABLE = [
  { faixa: "Recém-nascido", total: "14 – 17h", sonecas: "4 – 6 curtas", janela: "45 – 60 min" },
  { faixa: "1º trimestre", total: "13 – 16h", sonecas: "4 – 5", janela: "1h – 1h30" },
  { faixa: "2º trimestre", total: "12 – 15h", sonecas: "3", janela: "1h30 – 2h" },
  { faixa: "3º trimestre", total: "11 – 14h", sonecas: "2", janela: "2h30 – 3h30" },
  { faixa: "4º trimestre", total: "11 – 14h", sonecas: "1 – 2", janela: "3h – 4h" },
];

const PILLARS = [
  { n: "01", t: "Ambiente", s: "o quarto fala antes de você", d: "Escuridão total, barulho branco contínuo, temperatura entre 19 e 22°C e berço livre de estímulos. É metade do caminho, e o mais fácil de ajustar hoje." },
  { n: "02", t: "Rotina", s: "sequência, não relógio", d: "De 3 a 5 passos curtos, sempre na mesma ordem, terminando no berço com o bebê desperto. A criança reconhece a ordem antes de reconhecer a hora." },
  { n: "03", t: "Janela de sono", s: "deitar antes do pico", d: "O tempo que o bebê aguenta acordado entre uma soneca e outra. Quem deita dentro da janela adormece com calma. Quem passa, paga em choro." },
];

const PLAN = [
  { n: "Semana 1", t: "Observar e registrar", d: "Você não muda nada. Anota horários de soneca e despertar, marca os sinais de cansaço e observa o quarto em três momentos do dia." },
  { n: "Semana 2", t: "Ajustar o ambiente", d: "Mexe só no espaço: escuridão total, barulho branco constante, temperatura e roupa certas para a noite real." },
  { n: "Semana 3", t: "Construir a rotina", d: "Define a sequência da noite (3 a 5 passos), sempre igual, começando no mesmo cômodo e terminando no berço com o bebê desperto." },
  { n: "Semana 4", t: "Acertar a janela", d: "Cruza seus registros com a tabela por idade e inicia a rotina 10 a 15 minutos antes do fim da janela. Ajusta a cada três dias, não a cada dia." },
];

const MYTHS = [
  { m: "“Bebê bem cansado dorme melhor à noite.”", r: "O super cansaço aumenta o cortisol e fragmenta o sono. Bebê descansado dorme melhor que bebê esgotado." },
  { m: "“Dormir mais tarde faz o bebê dormir até mais tarde.”", r: "Atrasar o horário antecipa o despertar. O sono profundo se concentra na primeira metade da noite." },
  { m: "“Cortar a soneca da tarde melhora a noite.”", r: "A soneca da tarde protege a noite. Tirar antes da hora desorganiza tudo no dia seguinte." },
  { m: "“Sem deixar chorar, não existe método de sono.”", r: "A educação intencional de sono existe, conduzida pelos pais, com presença, sem deixar o bebê sozinho no choro." },
];

export default function GuiaSonoLanding({ dict }: { dict: LocaleDict }) {
  const [open, setOpen] = useState(false);
  const { leadForm, meta } = dict;

  const fade = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  };

  const Cta = ({ children }: { children: React.ReactNode }) => (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="inline-flex items-center justify-center font-barlow-condensed text-sm tracking-[0.2em] uppercase px-10 py-4 bg-rose-accent text-background font-semibold hover:bg-text-primary transition-colors duration-300 shadow-lg shadow-rose-accent/20"
    >
      {children}
    </button>
  );

  return (
    <main className="w-full overflow-x-hidden bg-background text-text-primary">
      {/* HERO */}
      <section className="px-6 md:px-16 lg:px-20 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1"
          >
            <span className="font-barlow-condensed text-[11px] tracking-[0.35em] uppercase text-rose-accent">
              Material gratuito
            </span>
            <h1 className="font-playfair leading-[1.05] mt-5" style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
              <span className="font-bold block text-text-primary">Primeiros 30 dias</span>
              <span className="italic block text-rose-accent">do sono</span>
            </h1>
            <p className="font-barlow text-text-secondary leading-relaxed mt-6 max-w-xl" style={{ fontSize: "clamp(17px, 1.5vw, 21px)" }}>
              As bases para organizar o sono do seu bebê, ainda hoje. Sem método
              milagroso, sem deixar chorar: entender o que está acontecendo e
              conduzir com firmeza e ternura.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3">
              <Cta>Baixar o guia grátis</Cta>
              <p className="font-barlow text-[13px] text-text-muted">
                PDF de 8 páginas · entrega imediata no seu e-mail
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 md:order-2 flex justify-center"
          >
            <img
              src="/guides/capa-sono.webp"
              alt="Capa do guia Primeiros 30 dias do sono"
              className="w-[70%] md:w-[80%] max-w-sm rounded-[6px] shadow-2xl shadow-text-primary/25 ring-1 ring-cream-line"
              draggable={false}
            />
          </motion.div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="px-6 md:px-16 lg:px-20 py-20 md:py-28 bg-background-soft border-y border-cream-line">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-14">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">Para quem é</span>
          <h2 className="font-playfair font-normal mt-3" style={{ fontSize: "clamp(30px, 4.5vw, 50px)" }}>
            Um chamado para a mãe<br />que está chegando agora
          </h2>
        </motion.div>
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {FOR_WHOM.map((t, i) => (
            <motion.div
              key={i}
              className="flex gap-4 items-start bg-background border border-cream-line p-5 md:p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <span className="font-playfair italic text-rose-accent/70 text-xl shrink-0 w-6">{i + 1}</span>
              <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(16px, 1.3vw, 19px)" }}>{t}</p>
            </motion.div>
          ))}
        </div>
        <motion.p {...fade} className="max-w-3xl mx-auto text-center mt-10 font-playfair italic text-text-primary" style={{ fontSize: "clamp(18px, 2vw, 24px)" }}>
          Se você se identificou com qualquer uma dessas, este guia é seu.
        </motion.p>
      </section>

      {/* COMO FUNCIONA + TABELA */}
      <section className="px-6 md:px-16 lg:px-20 py-20 md:py-28">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-12">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">O que você vai entender</span>
          <h2 className="font-playfair font-normal mt-3 mb-4" style={{ fontSize: "clamp(30px, 4.5vw, 50px)" }}>
            Como funciona o sono do bebê
          </h2>
          <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(16px, 1.3vw, 19px)" }}>
            O sono do bebê não é uma versão menor do sono adulto. Tem outra
            arquitetura e outros ciclos. Entender isso é o que separa a mãe que
            reage da mãe que conduz. O guia traz a tabela completa de referência
            por idade:
          </p>
        </motion.div>

        <FadeIn className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse text-left min-w-[520px]">
            <thead>
              <tr className="bg-rose-accent text-background">
                <th className="font-barlow-condensed text-[11px] tracking-[0.2em] uppercase p-4">Faixa</th>
                <th className="font-barlow-condensed text-[11px] tracking-[0.2em] uppercase p-4">Sono / 24h</th>
                <th className="font-barlow-condensed text-[11px] tracking-[0.2em] uppercase p-4">Sonecas</th>
                <th className="font-barlow-condensed text-[11px] tracking-[0.2em] uppercase p-4">Janela acordado</th>
              </tr>
            </thead>
            <tbody>
              {TABLE.map((r, i) => (
                <tr key={r.faixa} className={i % 2 ? "bg-background-soft" : "bg-background"}>
                  <td className="font-playfair italic text-rose-accent p-4 text-[16px]">{r.faixa}</td>
                  <td className="font-barlow text-text-primary p-4 text-[16px]">{r.total}</td>
                  <td className="font-barlow text-text-secondary p-4 text-[16px]">{r.sonecas}</td>
                  <td className="font-barlow text-text-secondary p-4 text-[16px]">{r.janela}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeIn>
        <motion.p {...fade} className="max-w-4xl mx-auto text-center mt-5 font-barlow text-text-muted text-[14px]">
          Guias de observação, não metas. Cada bebê varia até duas horas para mais ou para menos.
        </motion.p>
      </section>

      {/* TRÊS PILARES */}
      <section className="px-6 md:px-16 lg:px-20 py-20 md:py-28 bg-background-soft border-y border-cream-line">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-14">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">A casa do sono</span>
          <h2 className="font-playfair font-normal mt-3" style={{ fontSize: "clamp(30px, 4.5vw, 50px)" }}>
            Os três pilares
          </h2>
        </motion.div>
        <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.n}
              className="bg-background border border-cream-line p-7 md:p-8 flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <span className="font-playfair italic text-rose-accent/60" style={{ fontSize: "clamp(28px, 3vw, 40px)" }}>{p.n}</span>
              <h3 className="font-playfair text-text-primary mt-3" style={{ fontSize: "clamp(22px, 2.2vw, 28px)" }}>{p.t}</h3>
              <p className="font-barlow italic text-rose-accent text-[15px] mt-1 mb-4">{p.s}</p>
              <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(15px, 1.2vw, 17px)" }}>{p.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PLANO DE 30 DIAS */}
      <section className="px-6 md:px-16 lg:px-20 py-20 md:py-28">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-14">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">Passo a passo</span>
          <h2 className="font-playfair font-normal mt-3 mb-4" style={{ fontSize: "clamp(30px, 4.5vw, 50px)" }}>
            Um plano de 30 dias,<br />um pilar por semana
          </h2>
          <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(16px, 1.3vw, 19px)" }}>
            A pressa é inimiga do sono. Um pilar por semana, e ao fim de trinta
            dias você tem a fundação inteira de pé.
          </p>
        </motion.div>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          {PLAN.map((s, i) => (
            <motion.div
              key={s.n}
              className="flex gap-5 items-baseline bg-background-soft border border-cream-line p-6 md:p-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
            >
              <span className="font-barlow-condensed text-[11px] tracking-[0.2em] uppercase text-rose-accent shrink-0 w-20 pt-1">{s.n}</span>
              <div>
                <h3 className="font-barlow font-semibold text-text-primary text-[18px] mb-1">{s.t}</h3>
                <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(15px, 1.2vw, 17px)" }}>{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MITOS */}
      <section className="px-6 md:px-16 lg:px-20 py-20 md:py-28 bg-background-soft border-y border-cream-line">
        <motion.div {...fade} className="max-w-3xl mx-auto text-center mb-14">
          <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-rose-accent">O que se diz vs. o que a ciência mostra</span>
          <h2 className="font-playfair font-normal mt-3" style={{ fontSize: "clamp(30px, 4.5vw, 50px)" }}>
            Os quatro mitos do sono
          </h2>
        </motion.div>
        <div className="max-w-4xl mx-auto grid gap-5 md:grid-cols-2">
          {MYTHS.map((m, i) => (
            <motion.div
              key={i}
              className="bg-background border border-cream-line p-6 md:p-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
            >
              <p className="font-playfair italic text-text-muted mb-3 leading-snug" style={{ fontSize: "clamp(16px, 1.4vw, 19px)" }}>{m.m}</p>
              <p className="font-barlow text-text-primary leading-relaxed" style={{ fontSize: "clamp(15px, 1.2vw, 17px)" }}>{m.r}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-6 md:px-16 lg:px-20 py-24 md:py-32 text-center">
        <motion.div {...fade} className="max-w-2xl mx-auto flex flex-col items-center gap-7">
          <div className="w-10 h-px bg-rose-accent" aria-hidden="true" />
          <h2 className="font-playfair leading-tight" style={{ fontSize: "clamp(30px, 4.5vw, 54px)" }}>
            <span className="font-bold block text-text-primary">Comece hoje a organizar</span>
            <span className="italic block text-rose-accent">o sono do seu bebê</span>
          </h2>
          <p className="font-barlow text-text-secondary leading-relaxed" style={{ fontSize: "clamp(16px, 1.3vw, 19px)" }}>
            Trinta dias depois, você não terá um bebê &ldquo;treinado&rdquo;. Terá uma
            família que entende o próprio sono.
          </p>
          <Cta>Quero o guia grátis</Cta>
          <p className="font-barlow text-[13px] text-text-muted">
            PDF de 8 páginas · entrega imediata · sem custo
          </p>
        </motion.div>
      </section>

      <footer className="px-6 py-14 border-t border-cream-line text-center">
        <span className="font-barlow-condensed text-[11px] tracking-[0.4em] uppercase text-text-secondary">
          Nágila Decastro
        </span>
      </footer>

      {open && (
        <LeadCaptureModal
          leadForm={leadForm}
          item={SONO_ITEM}
          locale={meta.locale}
          onClose={() => setOpen(false)}
        />
      )}
    </main>
  );
}
