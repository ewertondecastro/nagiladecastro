import { getDict } from "@/lib/getDict";
import HeroSection from "@/components/HeroSection";
import QuoteSection from "@/components/QuoteSection";
import AboutSection from "@/components/AboutSection";
import FamilySection from "@/components/FamilySection";
import ServicesSection from "@/components/ServicesSection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDict("es");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: "/es",
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

export default async function PageES() {
  const dict = await getDict("es");

  return (
    <main>
      <HeroSection dict={dict} locale="es" />
      <QuoteSection dict={dict} />
      <AboutSection dict={dict} />
      <FamilySection dict={dict} />
      <ServicesSection dict={dict} />
      <InstagramSection dict={dict} />
      <Footer dict={dict} />
    </main>
  );
}
