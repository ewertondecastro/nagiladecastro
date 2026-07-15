import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/lib/getDict";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Resources | Nagila Decastro",
  description:
    "Practical materials on motherhood, sleep and homeschooling to help you start today.",
};

export default async function RecursosPageEN() {
  const dict = await getDict("en");
  return (
    <main className="bg-background">
      <div className="px-8 md:px-16 lg:px-20 pt-10">
        <Link
          href="/en"
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
