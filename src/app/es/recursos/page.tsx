import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/lib/getDict";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Recursos | Nagila Decastro",
  description:
    "Materiales prácticos sobre maternidad, sueño y educación en casa para empezar hoy.",
};

export default async function RecursosPageES() {
  const dict = await getDict("es");
  return (
    <main className="bg-background">
      <div className="px-8 md:px-16 lg:px-20 pt-10">
        <Link
          href="/es"
          className="font-barlow-condensed text-[11px] tracking-[0.3em] uppercase text-text-secondary hover:text-rose-accent transition-colors"
        >
          ← Nagila Decastro
        </Link>
      </div>
      <ProductsSection dict={dict} />
      <Footer dict={dict} />
    </main>
  );
}
