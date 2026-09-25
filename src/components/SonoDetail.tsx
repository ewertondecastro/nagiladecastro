import Link from "next/link";
import Image from "next/image";
import FadeIn from "./FadeIn";
import SiteNav from "./SiteNav";
import Footer from "./Footer";
import HomeTestimonials from "./HomeTestimonials";
import FaqAccordion from "./FaqAccordion";
import MotionPrefs from "./MotionPrefs";
import { whatsAppUrl } from "@/lib/whatsapp";
import type { LocaleDict, Locale, ConsultoriaCard } from "@/types/locale";

interface Props {
  dict: LocaleDict;
  locale: Locale;
  card: ConsultoriaCard;
}

// Estrela da marca: sempre o PNG âmbar, em qualquer fundo.
function Star({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <img src="/images/brand/star-mark.png" alt="" aria-hidden="true" className={className} />
  );
}

// Cabeçalho de seção no padrão editorial da página: estrela, título em Lora
// itálico e o azul petróleo da categoria Sono.
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <Star className="w-5 h-5" />
      <h2
        className="font-playfair italic text-petrol leading-tight"
        style={{ fontSize: "clamp(26px, 3vw, 40px)" }}
      >
        {children}
      </h2>
    </div>
  );
}

function num(i: number): string {
  return String(i + 1).padStart(2, "0");
}

// Layout próprio da Consultoria de Sono. As outras consultorias continuam em
// ConsultoriaDetail: o conteúdo vem do mesmo dicionário, só a composição muda.
// A ideia aqui é quebrar a sucessão de faixas "título à esquerda, texto à
// direita" e dar ritmo ao scroll — colunas assimétricas, grade numerada,
// bloco azul deslocado, foto vertical e respiros curtos.
export default function SonoDetail({ dict, locale, card }: Props) {
  const d = card.detail;
  const homeHref = locale === "pt" ? "/" : `/${locale}`;

  const ctaBase =
    "inline-flex items-center justify-center text-center font-barlow-condensed text-sm tracking-widest uppercase font-semibold transition-colors duration-200 motion-reduce:transition-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

  return (
    <MotionPrefs>
      <main className="w-full bg-background min-h-screen">
        <SiteNav dict={dict} locale={locale} />
        <div className="h-16" aria-hidden="true" />

        {/* 1. HERO — composição assimétrica: a manchete ocupa a coluna larga em
            escala bem maior, e o texto de abertura com o CTA descem para uma
            coluna estreita à direita, separados por um filete. O espaço vazio
            fica concentrado embaixo da manchete, em vez de espalhado. */}
        <section className="w-full px-8 md:px-16 lg:px-20 pt-14 md:pt-20 pb-16 md:pb-24 bg-background">
          <FadeIn className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <Star className="w-4 h-4" />
              <span className="font-barlow-condensed text-xs tracking-[0.3em] text-petrol uppercase">
                {d.eyebrow}
              </span>
            </div>

            <h1
              className="font-playfair leading-[0.92] text-balance"
              style={{ fontSize: "clamp(46px, 9vw, 116px)" }}
            >
              <span className="block font-bold text-text-primary">{d.headlineLine1}</span>
              <span className="block italic text-petrol md:pl-[7%]">{d.headlineLine2}</span>
            </h1>

            {/* O texto de abertura desce para a metade direita: o vazio à
                esquerda passa a ser parte da composição, em vez de sobra. */}
            <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 lg:col-start-7 lg:border-l lg:border-cream-line lg:pl-10 xl:pl-14 flex flex-col items-start gap-8">
                <p
                  className="font-barlow text-text-secondary leading-relaxed"
                  style={{ fontSize: "clamp(16px, 1.3vw, 18px)" }}
                >
                  {d.intro}
                </p>
                {d.heroCtaLabel && (
                  <a
                    href={whatsAppUrl(d.heroCtaWhatsappText ?? d.ctaWhatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${ctaBase} max-w-full px-8 md:px-10 py-4 bg-terracotta text-background hover:bg-text-primary focus-visible:outline-terracotta`}
                  >
                    {d.heroCtaLabel}
                  </a>
                )}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* 2. PRA QUEM É — subiu para logo depois do hero, porque é a seção de
            identificação. Grade de dois por dois com número em âmbar e filete
            no topo de cada item: escaneável, sem virar caixa. */}
        <section className="w-full px-8 md:px-16 lg:px-20 py-20 md:py-28 bg-background-soft">
          <FadeIn className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-16">
            <div className="max-w-xl">
              <SectionTitle>{d.forWhomTitle}</SectionTitle>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20">
              {d.forWhomItems.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-5 md:gap-7 py-7 md:py-9 border-t border-cream-line"
                >
                  <span
                    className="font-playfair text-amber leading-none shrink-0 pt-1"
                    style={{ fontSize: "clamp(20px, 1.9vw, 28px)" }}
                  >
                    {num(i)}
                  </span>
                  <p
                    className="font-barlow text-text-primary leading-relaxed"
                    style={{ fontSize: "clamp(16px, 1.35vw, 19px)" }}
                  >
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </FadeIn>
        </section>

        {/* 3. POR QUE ISSO IMPORTA — transição curta, não bloco institucional.
            O título vira etiqueta e a ideia central mantém o tom de citação,
            mas em escala bem abaixo da manchete do hero, para não disputar
            com ela. O complemento desce deslocado para a direita. */}
        <section className="w-full px-8 md:px-16 lg:px-20 py-14 md:py-20 bg-background">
          <FadeIn className="max-w-4xl mx-auto flex flex-col gap-7 md:gap-9">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-amber" aria-hidden="true" />
              <h2 className="font-barlow-condensed text-[11px] md:text-xs tracking-[0.3em] uppercase text-text-muted">
                {d.whyTitle}
              </h2>
            </div>
            <p
              className="font-playfair italic text-petrol leading-[1.35]"
              style={{ fontSize: "clamp(19px, 2.1vw, 30px)" }}
            >
              {d.whyBody[0]}
            </p>
            {d.whyBody.slice(1).map((p, i) => (
              <p
                key={i}
                className="font-barlow text-text-secondary leading-relaxed max-w-xl lg:ml-auto lg:text-right"
                style={{ fontSize: "clamp(16px, 1.35vw, 19px)" }}
              >
                {p}
              </p>
            ))}
          </FadeIn>
        </section>

        {/* 4. COMO EU TE ACOMPANHO — a foto da Nágila em retrato entra na coluna
            estreita. O texto sobe ao lado, separado por filetes em vez de
            virar um parágrafo corrido. */}
        <section className="w-full px-8 md:px-16 lg:px-20 py-20 md:py-28 bg-background-soft">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <FadeIn direction="left" className="lg:col-span-5">
              <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-none">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="/images/nagila.jpg"
                    alt="Nágila Decastro"
                    fill
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn className="lg:col-span-7 lg:pt-8 flex flex-col gap-8">
              <SectionTitle>{d.journeyTitle}</SectionTitle>
              <div className="flex flex-col">
                {d.journeyBody.map((p, i) => (
                  <p
                    key={i}
                    className={`font-barlow text-text-secondary leading-relaxed ${
                      i > 0 ? "mt-7 pt-7 border-t border-cream-line" : ""
                    }`}
                    style={{ fontSize: "clamp(16px, 1.4vw, 19px)" }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 5. O QUE EU OBSERVO — grade 2x4 numerada. O filete do topo de cada
            item acende em petróleo no hover: mostra que existe método, sem
            virar lista longa nem quadro acadêmico. */}
        {d.howItWorks && (
          <section className="w-full px-8 md:px-16 lg:px-20 py-20 md:py-28 bg-background">
            <FadeIn className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-16">
              <div className="max-w-2xl">
                <SectionTitle>{d.howItWorks.title}</SectionTitle>
              </div>
              <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20">
                {d.howItWorks.steps.map((step, i) => (
                  <li
                    key={i}
                    className="group flex gap-5 md:gap-7 py-7 md:py-8 border-t border-cream-line transition-colors duration-300 motion-reduce:transition-none hover:border-petrol"
                  >
                    <span
                      className="font-playfair text-amber leading-none shrink-0 pt-1 transition-colors duration-300 motion-reduce:transition-none group-hover:text-petrol"
                      style={{ fontSize: "clamp(19px, 1.8vw, 26px)" }}
                    >
                      {num(i)}
                    </span>
                    <p
                      className="font-barlow text-text-primary leading-relaxed"
                      style={{ fontSize: "clamp(16px, 1.3vw, 18px)" }}
                    >
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </FadeIn>
          </section>
        )}

        {/* 6. E QUANTO AO CHORO — o azul entra como painel deslocado, não como
            faixa inteira: o título fica no creme, à esquerda, e o bloco
            petróleo começa depois dele e passa por trás. */}
        {d.methodNote && (
          <section className="w-full px-8 md:px-16 lg:px-20 py-16 md:py-24 bg-background">
            <div className="max-w-6xl mx-auto">
              {/* O título fica no creme, alinhado à esquerda; o azul entra logo
                  abaixo, recuado, cobrindo só parte da largura. Em vez de uma
                  faixa inteira, o bloco parece deslocado de propósito. */}
              <FadeIn className="max-w-lg mb-10 md:mb-12">
                <Star className="w-6 h-6 mb-5" />
                <h2
                  className="font-playfair italic text-petrol leading-[1.05]"
                  style={{ fontSize: "clamp(30px, 4vw, 54px)" }}
                >
                  {d.methodNote.title}
                </h2>
              </FadeIn>

              <FadeIn
                direction="right"
                className="bg-petrol px-8 md:px-14 lg:px-20 py-12 md:py-16 md:ml-16 lg:ml-28 xl:ml-40"
              >
                <div className="flex flex-col gap-6">
                  {d.methodNote.body.map((p, i) => (
                    <p
                      key={i}
                      className={`font-barlow leading-relaxed ${
                        i === 0 ? "text-background" : "text-background/90"
                      }`}
                      style={{
                        fontSize:
                          i === 0 ? "clamp(19px, 1.8vw, 24px)" : "clamp(16px, 1.35vw, 18px)",
                      }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* 8. PROVA SOCIAL — mensagens reais de mães, com os prints, já
            cadastradas no dicionário desta consultoria. Reaproveita o mesmo
            componente da home, sem o botão que levaria para /consultorias. */}
        <HomeTestimonials
          dict={dict}
          locale={locale}
          showCta={false}
          title="O que as mães me contam depois"
        />

        {/* 9. PLANOS — mesma hierarquia de antes (Completa em azul sólido,
            Express com contorno). Mudou só a composição: mais respiro, filete
            âmbar separando o nome do corpo e botão ancorado na base, para os
            dois cards terminarem alinhados. */}
        {d.plans && d.plans.length > 0 && (
          <section className="w-full px-8 md:px-16 lg:px-20 py-20 md:py-28 bg-background-soft">
            <FadeIn className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-16">
              <div className="flex flex-col items-center text-center gap-4">
                <Star className="w-6 h-6" />
                <h2
                  className="font-playfair italic text-petrol leading-tight"
                  style={{ fontSize: "clamp(26px, 3vw, 40px)" }}
                >
                  {d.plansTitle ?? "Como podemos trabalhar juntas"}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
                {d.plans.map((plan, i) => {
                  const hl = Boolean(plan.highlight);
                  return (
                    <div
                      key={i}
                      className={`flex flex-col h-full px-8 py-10 md:px-10 md:py-12 transition-colors duration-300 motion-reduce:transition-none ${
                        hl
                          ? "bg-petrol"
                          : "bg-background border border-cream-line hover:border-petrol"
                      }`}
                    >
                      {plan.duration && (
                        <span
                          className={`font-barlow-condensed text-[11px] tracking-[0.25em] uppercase ${
                            hl ? "text-background/70" : "text-petrol"
                          }`}
                        >
                          {plan.duration}
                        </span>
                      )}
                      <h3
                        className={`font-playfair mt-3 leading-tight ${
                          hl ? "text-background" : "text-text-primary"
                        }`}
                        style={{ fontSize: "clamp(26px, 2.8vw, 34px)" }}
                      >
                        {plan.name}
                      </h3>
                      <span aria-hidden="true" className="block h-px w-12 mt-7 bg-amber" />

                      <p
                        className={`font-barlow mt-7 leading-relaxed ${
                          hl ? "text-background/90" : "text-text-secondary"
                        }`}
                        style={{ fontSize: "clamp(16px, 1.4vw, 18px)" }}
                      >
                        {plan.summary}
                      </p>

                      {plan.forWhom && (
                        <p
                          className={`font-playfair italic mt-5 leading-relaxed ${
                            hl ? "text-amber" : "text-petrol"
                          }`}
                          style={{ fontSize: "clamp(15px, 1.3vw, 17px)" }}
                        >
                          {plan.forWhom}
                        </p>
                      )}

                      <ul className="flex flex-col gap-4 mt-9 flex-1">
                        {plan.includes.map((item, j) => (
                          <li
                            key={j}
                            className={`font-barlow leading-relaxed flex gap-3.5 ${
                              hl ? "text-background" : "text-text-primary"
                            }`}
                            style={{ fontSize: "clamp(15px, 1.3vw, 17px)" }}
                          >
                            <img
                              src="/images/brand/star-mark.png"
                              alt=""
                              aria-hidden="true"
                              className="w-3.5 h-3.5 mt-1.5 shrink-0"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href={whatsAppUrl(plan.ctaWhatsappText ?? d.ctaWhatsappText)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${ctaBase} mt-10 px-8 py-4 ${
                          hl
                            ? "bg-terracotta text-background hover:bg-text-primary focus-visible:outline-background"
                            : "border border-petrol text-petrol hover:bg-petrol hover:text-background focus-visible:outline-petrol"
                        }`}
                      >
                        {plan.ctaLabel ?? d.ctaLabel}
                      </a>
                    </div>
                  );
                })}
              </div>

              {d.recordingNote && (
                <p className="flex gap-4 items-start max-w-2xl border-t border-cream-line pt-6 font-barlow text-text-muted leading-relaxed text-[15px]">
                  <Star className="w-3.5 h-3.5 mt-1 shrink-0" />
                  <span>{d.recordingNote}</span>
                </p>
              )}
            </FadeIn>
          </section>
        )}

        {/* 10. FAQ — mesmas perguntas e respostas, em um accordion com abertura
            suave, hover discreto e foco visível. */}
        {d.faq && d.faq.length > 0 && (
          <section className="w-full px-8 md:px-16 lg:px-20 py-20 md:py-28 bg-background">
            <FadeIn className="max-w-4xl mx-auto flex flex-col gap-10 md:gap-14">
              <SectionTitle>{d.faqTitle ?? "Perguntas frequentes"}</SectionTitle>
              <FaqAccordion items={d.faq} />
            </FadeIn>
          </section>
        )}

        {/* 11. CTA FINAL — fechamento aberto: sem caixa em volta, só a
            estrela, o título, um filete âmbar e o botão, centralizados.
            Mensagem e link de WhatsApp inalterados. */}
        <section className="w-full px-8 md:px-16 lg:px-20 py-16 md:py-24 bg-background-soft">
          <FadeIn className="max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center gap-7">
              <Star className="w-6 h-6" />
              <h2
                className="font-playfair italic text-text-primary leading-tight text-balance"
                style={{ fontSize: "clamp(26px, 3.4vw, 44px)" }}
              >
                {card.titleLine1} {card.titleLine2}
              </h2>
              <span aria-hidden="true" className="h-px w-16 bg-amber" />
              <a
                href={whatsAppUrl(d.ctaWhatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${ctaBase} max-w-full px-8 md:px-10 py-4 bg-terracotta text-background hover:bg-text-primary focus-visible:outline-terracotta`}
              >
                {d.ctaLabel}
              </a>
              <Link
                href={homeHref}
                className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-text-muted hover:text-petrol transition-colors duration-200 motion-reduce:transition-none focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-petrol"
              >
                ← {d.backToHome}
              </Link>
            </div>
          </FadeIn>
        </section>

        <Footer dict={dict} locale={locale} />
      </main>
    </MotionPrefs>
  );
}
