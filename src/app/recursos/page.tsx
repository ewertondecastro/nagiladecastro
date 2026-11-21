import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import SiteNav from "@/components/SiteNav";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";
import RecursosConsultoria from "@/components/v2/RecursosConsultoria";

export const metadata: Metadata = {
  title: "Recursos | Nágila Decastro",
  description:
    "Materiais práticos de maternidade, sono e educação em casa para você começar hoje.",
  alternates: {
    canonical: "/recursos",
  },
};

export default async function RecursosPage() {
  const dict = await getDict("pt");
  const primeirosPassos = dict.services.cards.find((c) => c.slug === "primeiros-passos");
  return (
    <main className="bg-background">
      <SiteNav dict={dict} locale="pt" />
      <div className="h-16" aria-hidden="true" />
      <ProductsSection dict={dict} />
      {primeirosPassos && <RecursosConsultoria card={primeirosPassos} />}
      <Footer dict={dict} locale="pt" />
    </main>
  );
}
