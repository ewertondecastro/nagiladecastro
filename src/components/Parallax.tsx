"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Move o conteúdo em Y conforme a seção passa pela viewport, criando
 * profundidade (parallax). O div externo é estável (âncora do scroll);
 * o interno é o que se move.
 */
export default function Parallax({
  children,
  className = "",
  innerClassName = "",
  distance = 60,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(yRaw, { stiffness: 80, damping: 30, mass: 0.35 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className={innerClassName}>
        {children}
      </motion.div>
    </div>
  );
}
