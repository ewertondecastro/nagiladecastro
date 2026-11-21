import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import ConsultoriasIndex from "@/components/ConsultoriasIndex";

export const metadata: Metadata = {
  title: "Consultorias | Nágila Decastro",
  description:
    "Consultoria de sono e educação parental com direção. Dois caminhos, uma raiz: cuidar da mãe e da casa.",
  alternates: {
    canonical: "/consultorias",
  },
};

export default async function Page() {
  const dict = await getDict("pt");
  return <ConsultoriasIndex dict={dict} locale="pt" />;
}
