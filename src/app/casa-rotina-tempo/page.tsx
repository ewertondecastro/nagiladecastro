import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import SiteNav from "@/components/SiteNav";
import SalesPageEbook from "./SalesPageEbook";

export const metadata: Metadata = {
  title:
    "Casa, Rotina & Tempo: e-book para sair do improviso | Nágila Decastro",
  description:
    "Guia prático e afetuoso para a mãe que vive no improviso: diagnóstico da casa, nove capítulos, ferramentas para preencher e um plano de 7 dias para devolver direção, ritmo e paz ao lar.",
  openGraph: {
    images: [{ url: "/og/ebook.jpg", width: 1200, height: 630, alt: "Casa, Rotina & Tempo" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/ebook.jpg"],
  },
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
