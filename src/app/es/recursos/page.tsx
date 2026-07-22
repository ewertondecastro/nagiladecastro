import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import SiteNav from "@/components/SiteNav";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Recursos | Nágila Decastro",
  description:
    "Materiales prácticos sobre maternidad, sueño y educación en casa para empezar hoy.",
};

export default async function RecursosPageES() {
  const dict = await getDict("es");
  return (
    <main className="bg-background">
      <SiteNav dict={dict} locale="es" />
      <div className="h-16" aria-hidden="true" />
      <ProductsSection dict={dict} />
      <Footer dict={dict} locale="es" />
    </main>
  );
}
