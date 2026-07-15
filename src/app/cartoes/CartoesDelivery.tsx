"use client";

import { useState } from "react";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import type { LocaleDict, ProductItem } from "@/types/locale";

// Item sintético só para o modal reutilizar o mesmo fluxo (gate de verdade):
// o link do PDF vem da resposta do servidor, nunca fica nesta página.
const ITEM: ProductItem = {
  kind: "free",
  badge: "GRATUITO",
  titleLine1: "Cartões de Português",
  titleLine2: "para os Pequenos",
  description: "",
  cta: "Baixar os cartões (PDF)",
  gated: true,
  resourceKey: "cartoes",
};

export default function CartoesDelivery({ leadForm }: { leadForm: LocaleDict["leadForm"] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-block font-barlow-condensed text-sm tracking-widest uppercase px-10 py-4 bg-rose-accent text-background font-semibold hover:bg-text-primary transition-colors duration-200"
      >
        {ITEM.cta}
      </button>

      {open && (
        <LeadCaptureModal
          leadForm={leadForm}
          item={ITEM}
          locale="pt"
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
