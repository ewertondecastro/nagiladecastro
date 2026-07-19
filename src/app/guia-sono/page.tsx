import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import SiteNav from "@/components/SiteNav";
import GuiaSonoLanding from "./GuiaSonoLanding";

export const metadata: Metadata = {
  title:
    "Guia gratuito: Primeiros 30 dias do sono do bebê | Nagila Decastro",
  description:
    "Guia gratuito com as bases para organizar o sono do seu bebê: como funciona o sono, tabela por idade, os três pilares e um plano de 30 dias. Sem deixar chorar, com presença.",
};

export default async function GuiaSonoPage() {
  const dict = await getDict("pt");
  return (
    <>
      <SiteNav dict={dict} locale="pt" />
      <GuiaSonoLanding dict={dict} />
    </>
  );
}
