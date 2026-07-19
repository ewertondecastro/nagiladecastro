import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import SiteNav from "@/components/SiteNav";
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
      <SiteNav dict={dict} locale="en" />
      <div className="h-16" aria-hidden="true" />
      <ProductsSection dict={dict} />
      <Footer dict={dict} locale="en" />
    </main>
  );
}
