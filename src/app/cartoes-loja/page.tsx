import type { Metadata } from "next";
import SalesPage from "./SalesPage";

export const metadata: Metadata = {
  title: "Cartões de Português para os Pequenos | Nagila Decastro",
  description:
    "80 cartões ilustrados para alfabetizar brincando: substantivo, verbo, frase, pontuação, acentuação e muito mais. Material digital para imprimir em casa.",
};

export default function CartoesLojaPage() {
  return <SalesPage />;
}
