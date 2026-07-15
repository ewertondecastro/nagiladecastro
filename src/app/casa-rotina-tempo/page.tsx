import type { Metadata } from "next";
import SalesPageEbook from "./SalesPageEbook";

export const metadata: Metadata = {
  title:
    "Casa, Rotina & Tempo — E-book para sair do improviso | Nágila Decastro",
  description:
    "Guia prático e afetuoso para a mãe que vive no improviso: diagnóstico da casa, nove capítulos, ferramentas para preencher e um plano de 7 dias para devolver direção, ritmo e paz ao lar.",
};

export default function CasaRotinaTempoPage() {
  return <SalesPageEbook />;
}
