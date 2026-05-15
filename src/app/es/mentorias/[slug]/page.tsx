import { notFound } from "next/navigation";
import { getDict } from "@/lib/getDict";
import MentoriaDetail from "@/components/MentoriaDetail";
import type { Metadata } from "next";
import type { MentoriaSlug } from "@/types/locale";

const SLUGS: MentoriaSlug[] = ["sono", "maternidade", "homeschool", "meti"];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const dict = await getDict("es");
  const card = dict.services.cards.find((c) => c.slug === params.slug);
  if (!card) return {};
  const title = `${card.titleLine1} ${card.titleLine2} · ${dict.meta.title}`;
  return {
    title,
    description: card.description,
    alternates: {
      canonical: `/es/mentorias/${params.slug}`,
      languages: {
        "pt-BR": `/mentorias/${params.slug}`,
        "en-US": `/en/mentorias/${params.slug}`,
        "es-ES": `/es/mentorias/${params.slug}`,
      },
    },
  };
}

export default async function MentoriaPageES({ params }: PageProps) {
  const dict = await getDict("es");
  const card = dict.services.cards.find((c) => c.slug === params.slug);
  if (!card) notFound();
  return <MentoriaDetail dict={dict} locale="es" card={card} />;
}
