"use client";

import Link from "next/link";
import { whatsAppUrl } from "@/lib/whatsapp";
import { C, display, sans, eyebrow, Reveal, Spark, Button } from "./chrome";
import type { ConsultoriaCard } from "@/types/locale";

// A consultoria Primeiros Passos fica só aqui, em Recursos. Os textos vêm
// do dicionário, iguais à página da consultoria.
export default function RecursosConsultoria({ card }: { card: ConsultoriaCard }) {
  return (
    <section className="w-full bg-[#ECE6D8] px-5 md:px-10 pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="bg-[#3B4A3D] text-[#F4EFE6] rounded-[28px] p-8 md:p-14 grid md:grid-cols-12 gap-8 md:gap-12 items-center relative overflow-hidden">
            <Spark className="absolute right-8 top-8 w-8 h-8 opacity-80" />
            <div className="md:col-span-7">
              <p className={`${eyebrow} text-[#D4A84B]`}>Consultoria</p>
              <h2
                className={`${display} font-normal leading-[1.05] mt-4`}
                style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
              >
                {card.titleLine1} <span className="italic text-[#E3C58B]">{card.titleLine2}</span>
              </h2>
              <p className={`${sans} text-[16px] md:text-[17px] leading-[1.75] text-[#F4EFE6]/80 mt-5`}>
                {card.description}
              </p>
              {card.formats && (
                <p className={`${sans} text-[14px] text-[#D4A84B] mt-3`}>{card.formats}</p>
              )}
            </div>
            <div className="md:col-span-5 flex flex-col gap-3 md:items-end">
              <Button href={whatsAppUrl(card.whatsappText)} color={C.terracotta}>
                {card.contactCta}
              </Button>
              <Link
                href={`/consultorias/${card.slug}`}
                className={`${sans} text-[14px] font-semibold text-[#F4EFE6]/80 hover:text-[#F4EFE6] underline underline-offset-4 decoration-[#F4EFE6]/30 py-2 md:pr-6`}
              >
                {card.learnMore}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
