import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import SobrePage from "@/components/SobrePage";

export const metadata: Metadata = {
  title: "About | Nagila Decastro",
  description:
    "Nagila Decastro: mother of two girls, wife, homeschool educator and mentor to mothers in Cape Cod, Massachusetts.",
  alternates: {
    canonical: "/en/sobre",
    languages: { "pt-BR": "/sobre", "en-US": "/en/sobre", "es-ES": "/es/sobre" },
  },
};

export default async function Page() {
  const dict = await getDict("en");
  return <SobrePage dict={dict} locale="en" />;
}
