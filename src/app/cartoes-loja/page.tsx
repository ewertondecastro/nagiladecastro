import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import SiteNav from "@/components/SiteNav";
import SalesPage from "./SalesPage";

export const metadata: Metadata = {
  title:
    "Português em Cartões: 40 flashcards de gramática, fonologia e pontuação para imprimir",
  description:
    "Arquivo digital com 40 cartões educativos frente e verso (80 faces de conteúdo) para imprimir, dobrar e plastificar. Gramática, fonologia e pontuação com exemplos infantis e desafios.",
  openGraph: {
    images: [{ url: "/og/cartoes.jpg", width: 1200, height: 630, alt: "Português em Cartões" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/cartoes.jpg"],
  },
};

export default async function CartoesLojaPage() {
  const dict = await getDict("pt");
  return (
    <>
      <SiteNav dict={dict} locale="pt" />
      <SalesPage />
    </>
  );
}
