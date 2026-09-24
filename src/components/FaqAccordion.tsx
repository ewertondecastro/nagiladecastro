"use client";

import { useId, useState } from "react";

interface Props {
  items: { question: string; answer: string }[];
}

// Accordion do FAQ. Abre com transição de altura via grid-template-rows, que é
// CSS puro — não precisa de biblioteca nem de medir o conteúdo. O sinal de mais
// vira menos escondendo a barra vertical. Quem pediu menos movimento no sistema
// (prefers-reduced-motion) recebe a abertura instantânea, via motion-reduce.
export default function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const base = useId();

  return (
    <div className="flex flex-col border-t border-cream-line">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `${base}-panel-${i}`;
        const buttonId = `${base}-button-${i}`;

        return (
          <div key={i} className="border-b border-cream-line">
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="group w-full flex items-start justify-between gap-6 text-left py-6 md:py-7 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-petrol"
              >
                <span
                  className="font-barlow font-semibold text-text-primary leading-snug transition-colors duration-200 motion-reduce:transition-none group-hover:text-petrol"
                  style={{ fontSize: "clamp(17px, 1.5vw, 20px)" }}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="relative shrink-0 mt-2 block w-3.5 h-3.5"
                >
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-petrol" />
                  <span
                    className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-petrol origin-center transition-transform duration-300 motion-reduce:transition-none ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`font-barlow text-text-secondary leading-relaxed max-w-2xl pb-7 pr-6 transition-opacity duration-300 motion-reduce:transition-none ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ fontSize: "clamp(16px, 1.4vw, 18px)" }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
