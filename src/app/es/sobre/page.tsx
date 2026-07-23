import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import SobrePage from "@/components/SobrePage";

export const metadata: Metadata = {
  title: "Sobre mí | Nágila Decastro",
  description:
    "Nágila Decastro: esposa, madre de dos niñas, educadora en casa y consultora de madres en Cape Cod, Massachusetts.",
  alternates: {
    canonical: "/es/sobre",
    languages: { "pt-BR": "/sobre", "en-US": "/en/sobre", "es-ES": "/es/sobre" },
  },
};

export default async function Page() {
  const dict = await getDict("es");
  return <SobrePage dict={dict} locale="es" />;
}
