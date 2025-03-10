"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export function AnimationWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { variants, transition } = fadeIn;
  const { initial, animate, exit } = variants;

  return (
    <AnimatePresence>
      <motion.div
        className={className}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
