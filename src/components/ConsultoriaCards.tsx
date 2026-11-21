import Link from "next/link";
import FadeIn from "./FadeIn";
import { whatsAppUrl } from "@/lib/whatsapp";
import type { LocaleDict, Locale } from "@/types/locale";

interface Props {
  dict: LocaleDict;
  locale: Locale;
  // Linha de formatos e o aviso da Sessão de Retorno. Ligados só na página
  // /consultorias; na home os cards continuam como estão.
  showFormats?: boolean;
}

function consultoriaHref(locale: Locale, slug: string): string {
  return locale === "pt" ? `/consultorias/${slug}` : `/${locale}/consultorias/${slug}`;
}

// Cor própria de cada card principal: Sono em azul petróleo, Educação Parental
// em roxo ameixa. Classes escritas por extenso porque o Tailwind lê o arquivo
// como texto (classe montada em runtime não entra no CSS final).
const featuredTheme = [
  {
    surface: "bg-petrol",
    outlineCta: "border-background text-background hover:bg-background hover:text-petrol",
  },
  {
    surface: "bg-plum",
    outlineCta: "border-background text-background hover:bg-background hover:text-plum",
  },
];

// Cartões das consultorias: só Sono e Educação Parental. A Primeiros Passos
// saiu daqui e aparece apenas na página Recursos.
export default function ConsultoriaCards({ dict, locale, showFormats = false }: Props) {
  const { services } = dict;
  const featured = services.cards.slice(0, 2);

  return (
    <>
      {featured.length > 0 && (
        <FadeIn className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 items-stretch">
          {featured.map((card, i) => (
            <div
              key={card.slug}
              className={`group relative ${featuredTheme[i].surface} border border-background/15 p-10 md:p-16 lg:p-20 min-h-[420px] md:min-h-[560px] overflow-hidden flex flex-col transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-background/40 hover:shadow-[0_12px_30px_-18px_rgba(45,36,30,0.6)]`}
            >
              {/* O cartão inteiro leva para a página da consultoria. Os botões
                  ficam acima desta camada e continuam com o destino próprio. */}
              <Link
                href={consultoriaHref(locale, card.slug)}
                className="absolute inset-0 z-10"
                aria-label={`${card.titleLine1} ${card.titleLine2}`}
              />
              <div className="relative z-20 flex flex-col flex-1 pointer-events-none">
                <span className="flex items-center gap-3 mb-5">
                  <span className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-amber">
                    {card.number}
                  </span>
                  <span className="h-px w-8 bg-amber/40" aria-hidden="true" />
                </span>
                <h3 className="font-playfair leading-tight mb-4" style={{ fontSize: "clamp(26px, 2.4vw, 34px)" }}>
                  <span className="font-bold text-background">{card.titleLine1} </span>
                  <span className="italic text-background">{card.titleLine2}</span>
                </h3>
                <p className="font-barlow text-background/85 leading-relaxed mb-5" style={{ fontSize: "clamp(16px, 1.15vw, 18px)" }}>
                  {card.description}
                </p>
                {showFormats && card.formats && (
                  <p className="font-barlow text-amber leading-relaxed mb-5" style={{ fontSize: "clamp(14px, 1vw, 15px)" }}>
                    {card.formats}
                  </p>
                )}
                <div className="mt-auto flex flex-wrap gap-3 pointer-events-auto">
                  <a
                    href={whatsAppUrl(card.whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 font-barlow-condensed text-sm tracking-widest uppercase px-7 py-3.5 bg-terracotta text-background font-semibold hover:bg-text-primary transition-colors duration-200 rounded-full"
                  >
                    {card.contactCta}
                  </a>
                  <Link
                    href={consultoriaHref(locale, card.slug)}
                    className={`relative z-20 font-barlow-condensed text-sm tracking-widest uppercase px-7 py-3.5 border bg-transparent transition-all duration-200 rounded-full ${featuredTheme[i].outlineCta}`}
                  >
                    {card.learnMore}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </FadeIn>
      )}

      {/* Aviso da Sessão de Retorno: fora dos cards, logo abaixo da grade.
          A primeira coluna vazia alinha o texto sob o card de Educação
          Parental no desktop; no mobile ela some e o aviso entra entre a
          Educação Parental e as frentes secundárias. */}
      {showFormats && services.returnNote && (
        <FadeIn className="max-w-7xl mx-auto mt-5 grid gap-6 md:grid-cols-2">
          <div className="hidden md:block" aria-hidden="true" />
          <Link
            href={consultoriaHref(locale, "educacao-parental")}
            className="block border-t border-cream-line pt-5 font-barlow text-text-muted leading-relaxed hover:text-plum transition-colors duration-200"
            style={{ fontSize: "clamp(13px, 0.95vw, 14px)" }}
          >
            {services.returnNote}
          </Link>
        </FadeIn>
      )}

    </>
  );
}
