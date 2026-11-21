import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import HomeNova from "@/components/v2/HomeNova";

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
    <HomeNova sono={sono} parental={parental} />
  );
}
