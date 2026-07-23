import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import ConsultoriasIndex from "@/components/ConsultoriasIndex";

export const metadata: Metadata = {
  title: "Consulting | Nágila Decastro",
  description:
    "Sleep consulting, first steps to literacy and parenting with direction. Three paths, one root: caring for the mother and the home.",
  alternates: {
    canonical: "/en/consultorias",
    languages: { "pt-BR": "/consultorias", "en-US": "/en/consultorias", "es-ES": "/es/consultorias" },
  },
};

export default async function Page() {
  const dict = await getDict("en");
  return <ConsultoriasIndex dict={dict} locale="en" />;
}
