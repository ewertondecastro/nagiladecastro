import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import SiteNav from "@/components/SiteNav";
import SalesPageEmocoes from "./SalesPageEmocoes";

export const metadata: Metadata = {
  title:
    "O que eu sinto, o que eu faço: 20 flashcards de emoções e domínio próprio | Nagila Decastro",
  description:
    "20 cartões ilustrados que ajudam a criança a perceber, nomear e responder a cada emoção. Método de 5 passos no verso, base cristã e afetuosa. Arquivo digital para imprimir em casa, quantas vezes quiser.",
};

export default async function EmocoesPage() {
  const dict = await getDict("pt");
  return (
    <>
      <SiteNav dict={dict} locale="pt" />
      <SalesPageEmocoes />
    </>
  );
}
