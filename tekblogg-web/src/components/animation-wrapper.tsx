"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export function AnimationWrapper({ children }: { children: ReactNode }) {
  const { variants, transition } = fadeIn;
  const { initial, animate, exit } = variants;

  return (
    <AnimatePresence>
      <motion.div
        className="flex w-full flex-col items-center justify-center"
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
