"use client";

import { MotionConfig } from "framer-motion";

// Faz o framer-motion obedecer ao "reduzir movimento" do sistema dentro da
// árvore que envolve. Fica escopado à página que o usa, então o resto do site
// segue com o comportamento atual.
export default function MotionPrefs({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
