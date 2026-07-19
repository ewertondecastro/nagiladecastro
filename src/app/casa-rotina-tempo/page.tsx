import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import SiteNav from "@/components/SiteNav";
import SalesPageEbook from "./SalesPageEbook";

export const metadata: Metadata = {
  title:
    "Casa, Rotina & Tempo: e-book para sair do improviso | Nagila Decastro",
  description:
    "Guia prático e afetuoso para a mãe que vive no improviso: diagnóstico da casa, nove capítulos, ferramentas para preencher e um plano de 7 dias para devolver direção, ritmo e paz ao lar.",
};

export default async function CasaRotinaTempoPage() {
  const dict = await getDict("pt");
  return (
    <>
      <SiteNav dict={dict} locale="pt" />
      <SalesPageEbook />
    </>
  );
}
