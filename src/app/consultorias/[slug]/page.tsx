import { notFound } from "next/navigation";
import { getDict } from "@/lib/getDict";
import ConsultoriaDetail from "@/components/ConsultoriaDetail";
import type { Metadata } from "next";
import type { ConsultoriaSlug } from "@/types/locale";

const SLUGS: ConsultoriaSlug[] = ["sono", "primeiros-passos", "educacao-parental"];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const dict = await getDict("pt");
  const card = dict.services.cards.find((c) => c.slug === params.slug);
  if (!card) return {};
  const title = `${card.titleLine1} ${card.titleLine2} · ${dict.meta.title}`;
  return {
    title,
    description: card.description,
    alternates: {
      canonical: `/consultorias/${params.slug}`,
      languages: {
        "pt-BR": `/consultorias/${params.slug}`,
        "en-US": `/en/consultorias/${params.slug}`,
        "es-ES": `/es/consultorias/${params.slug}`,
      },
    },
  };
}

export default async function ConsultoriaPage({ params }: PageProps) {
  const dict = await getDict("pt");
  const card = dict.services.cards.find((c) => c.slug === params.slug);
  if (!card) notFound();
  return <ConsultoriaDetail dict={dict} locale="pt" card={card} />;
}
