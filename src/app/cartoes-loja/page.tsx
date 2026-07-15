import type { Metadata } from "next";
import SalesPage from "./SalesPage";

export const metadata: Metadata = {
  title:
    "Português em Cartões — 20 Flashcards de Gramática, Fonologia e Pontuação para Imprimir",
  description:
    "Arquivo digital com 20 cartões educativos frente e verso (40 faces de conteúdo) para imprimir, dobrar e plastificar. Gramática, fonologia e pontuação com exemplos infantis e desafios.",
};

export default function CartoesLojaPage() {
  return <SalesPage />;
}
