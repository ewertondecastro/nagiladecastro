import type { Metadata } from "next";
import SalesPage from "./SalesPage";

export const metadata: Metadata = {
  title:
    "Português em Cartões — 40 Flashcards de Gramática, Fonologia e Pontuação para Imprimir",
  description:
    "Arquivo digital com 40 cartões educativos frente e verso (80 faces de conteúdo) para imprimir, dobrar e plastificar. Gramática, fonologia e pontuação com exemplos infantis e desafios.",
};

export default function CartoesLojaPage() {
  return <SalesPage />;
}
