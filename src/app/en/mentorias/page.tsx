import type { Metadata } from "next";
import { getDict } from "@/lib/getDict";
import MentoriasIndex from "@/components/MentoriasIndex";

export const metadata: Metadata = {
  title: "Mentoring | Nagila Decastro",
  description:
    "Sleep consulting, real motherhood, homeschool and METI mentoring. Four paths, one root: caring for the mother and the home.",
  alternates: {
    canonical: "/en/mentorias",
    languages: { "pt-BR": "/mentorias", "en-US": "/en/mentorias", "es-ES": "/es/mentorias" },
  },
};

export default async function Page() {
  const dict = await getDict("en");
  return <MentoriasIndex dict={dict} locale="en" />;
}
