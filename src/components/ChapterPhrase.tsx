import FadeIn from "./FadeIn";

interface Props {
  text: string;
  // Variante em fundo escuro (verde-oliva) para respiros mais dramáticos,
  // com costuras em gradiente que dissolvem a linha de corte entre seções.
  dark?: boolean;
}

// Respiro editorial entre seções: uma frase grande em Lora itálico, sem imagem
// nem botão, funcionando como "capítulo" da narrativa (referência Typeform,
// adaptado à identidade calma e terrosa da marca).
export default function ChapterPhrase({ text, dark = false }: Props) {
  const body = (
    <FadeIn className="max-w-4xl mx-auto text-center flex flex-col items-center">
      <span className="block w-10 h-px mb-8 bg-terracotta" aria-hidden="true" />
      <p
        className={`font-playfair italic leading-[1.15] ${dark ? "text-background" : "text-text-primary"}`}
        style={{ fontSize: "clamp(28px, 4.5vw, 54px)" }}
      >
        {text}
      </p>
    </FadeIn>
  );

  if (!dark) {
    return (
      <section className="w-full px-8 md:px-16 lg:px-20 py-24 md:py-36 bg-background">
        {body}
      </section>
    );
  }

  // Costura: fade de creme -> oliva no topo e oliva -> creme na base, para a
  // virada de tema não ter linha reta.
  return (
    <div className="w-full bg-olive">
      <div className="h-20 md:h-28 bg-gradient-to-b from-background to-olive" aria-hidden="true" />
      <section className="w-full px-8 md:px-16 lg:px-20 py-12 md:py-20">{body}</section>
      <div className="h-20 md:h-28 bg-gradient-to-b from-olive to-background" aria-hidden="true" />
    </div>
  );
}
