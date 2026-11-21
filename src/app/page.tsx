import type { Metadata } from "next";
import { Instrument_Serif, Manrope, Playfair_Display } from "next/font/google";
import { getDict } from "@/lib/getDict";
import HomeNova from "@/components/v2/HomeNova";

// Fontes da home: Instrument Serif (títulos delicados), Manrope (textos) e
// Playfair Display pesada só nas palavras de impacto.
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-v2-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-v2-sans",
  display: "swap",
});

const bold = Playfair_Display({
  subsets: ["latin"],
  weight: ["800", "900"],
  style: ["normal", "italic"],
  variable: "--font-v2-bold",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDict("pt");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: dict.meta.locale,
      images: [{ url: "/images/hero.jpg", width: 1080, height: 1080, alt: "Nágila Decastro" }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/images/hero.jpg"],
    },
  };
}

export default async function Home() {
  // Os textos das consultorias vêm do mesmo dicionário das páginas de
  // consultoria, para a home nunca divergir do que está descrito lá.
  const dict = await getDict("pt");
  const sono = dict.services.cards.find((c) => c.slug === "sono")!;
  const parental = dict.services.cards.find((c) => c.slug === "educacao-parental")!;
  return (
    <div className={`${display.variable} ${sans.variable} ${bold.variable}`}>
      <HomeNova sono={sono} parental={parental} />
    </div>
  );
}
