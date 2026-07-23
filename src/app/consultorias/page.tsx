import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import ConsultoriasIndex from "@/components/ConsultoriasIndex";

export const metadata: Metadata = {
  title: "Consultorias | Nágila Decastro",
  description:
    "Consultoria de sono, primeiros passos da alfabetização e educação parental com direção. Três caminhos, uma raiz: cuidar da mãe e da casa.",
  alternates: {
    canonical: "/consultorias",
    languages: { "pt-BR": "/consultorias", "en-US": "/en/consultorias", "es-ES": "/es/consultorias" },
  },
};

export default async function Page() {
  const dict = await getDict("pt");
  return <ConsultoriasIndex dict={dict} locale="pt" />;
}
