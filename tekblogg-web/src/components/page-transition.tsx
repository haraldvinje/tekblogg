import { ViewTransition } from "react";
import type { ReactNode } from "react";

/**
 * Cross-fades page content on client-side navigation. Animations are defined
 * in globals.css (`.page-enter` / `.page-exit`). `default="none"` keeps the
 * wrapper still during unrelated transitions such as category filtering.
 */
export function PageTransition({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div className={className}>{children}</div>
    </ViewTransition>
  );
}
