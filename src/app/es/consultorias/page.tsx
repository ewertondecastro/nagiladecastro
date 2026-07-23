import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import ConsultoriasIndex from "@/components/ConsultoriasIndex";

export const metadata: Metadata = {
  title: "Consultorías | Nágila Decastro",
  description:
    "Consultoría de sueño, primeros pasos de la alfabetización y educación parental con dirección. Tres caminos, una raíz: cuidar de la madre y de la casa.",
  alternates: {
    canonical: "/es/consultorias",
    languages: { "pt-BR": "/consultorias", "en-US": "/en/consultorias", "es-ES": "/es/consultorias" },
  },
};

export default async function Page() {
  const dict = await getDict("es");
  return <ConsultoriasIndex dict={dict} locale="es" />;
}
