import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import MentoriasIndex from "@/components/MentoriasIndex";

export const metadata: Metadata = {
  title: "Mentorias | Nagila Decastro",
  description:
    "Consultoria de sono, maternidade real, homeschool e Mentoria METI. Quatro caminhos, uma raiz: cuidar da mãe e da casa.",
  alternates: {
    canonical: "/mentorias",
    languages: { "pt-BR": "/mentorias", "en-US": "/en/mentorias", "es-ES": "/es/mentorias" },
  },
};

export default async function Page() {
  const dict = await getDict("pt");
  return <MentoriasIndex dict={dict} locale="pt" />;
}
