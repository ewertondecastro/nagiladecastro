import { getDict } from "@/lib/getDict";
import HeroSection from "@/components/HeroSection";
import QuoteSection from "@/components/QuoteSection";
import AboutSection from "@/components/AboutSection";
import FamilySection from "@/components/FamilySection";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDict("en");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: "/en",
      languages: {
        "pt-BR": "/",
        "en-US": "/en",
        "es-ES": "/es",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: dict.meta.locale,
      images: [{ url: "/images/hero.jpg", width: 1080, height: 1080, alt: "Nagila Decastro" }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/images/hero.jpg"],
    },
  };
}

export default async function PageEN() {
  const dict = await getDict("en");

  return (
    <main>
      <HeroSection dict={dict} locale="en" />
      <ServicesSection dict={dict} locale="en" />
      <ProductsSection dict={dict} />
      <QuoteSection dict={dict} />
      <AboutSection dict={dict} />
      <FamilySection dict={dict} />
      <ContactSection dict={dict} />
      <Footer dict={dict} />
    </main>
  );
}
