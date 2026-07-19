import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import SobrePage from "@/components/SobrePage";

export const metadata: Metadata = {
  title: "Sobre | Nagila Decastro",
  description:
    "Nagila Decastro: mãe de duas meninas, esposa, educadora em casa e mentora de mães em Cape Cod, Massachusetts.",
  alternates: {
    canonical: "/sobre",
    languages: { "pt-BR": "/sobre", "en-US": "/en/sobre", "es-ES": "/es/sobre" },
  },
};

export default async function Page() {
  const dict = await getDict("pt");
  return <SobrePage dict={dict} locale="pt" />;
}
