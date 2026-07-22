import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import SiteNav from "@/components/SiteNav";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Recursos | Nágila Decastro",
  description:
    "Materiais práticos de maternidade, sono e educação em casa para você começar hoje.",
};

export default async function RecursosPage() {
  const dict = await getDict("pt");
  return (
    <main className="bg-background">
      <SiteNav dict={dict} locale="pt" />
      <div className="h-16" aria-hidden="true" />
      <ProductsSection dict={dict} />
      <Footer dict={dict} locale="pt" />
    </main>
  );
}
