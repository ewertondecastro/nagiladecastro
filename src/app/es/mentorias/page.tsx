import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import MentoriasIndex from "@/components/MentoriasIndex";

export const metadata: Metadata = {
  title: "Mentorías | Nagila Decastro",
  description:
    "Consultoría de sueño, maternidad real, homeschool y Mentoría METI. Cuatro caminos, una raíz: cuidar de la madre y de la casa.",
  alternates: {
    canonical: "/es/mentorias",
    languages: { "pt-BR": "/mentorias", "en-US": "/en/mentorias", "es-ES": "/es/mentorias" },
  },
};

export default async function Page() {
  const dict = await getDict("es");
  return <MentoriasIndex dict={dict} locale="es" />;
}
