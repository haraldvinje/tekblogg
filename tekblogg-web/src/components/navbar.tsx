"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./theme-switcher";

export function Navbar() {
  const path = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-default bg-surface/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className={`flex items-center space-x-2 transition-all duration-200 hover:opacity-80 ${
              path === "/" ? "opacity-100" : "opacity-90"
            }`}
          >
            <span className="text-xl font-bold tracking-tight text-primary">
              TekBlogg
            </span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                path === "/"
                  ? "text-accent-600 dark:text-accent-400"
                  : "text-secondary hover:text-accent-600 dark:hover:text-accent-400"
              }`}
            >
              Hjem
              {path === "/" && (
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-accent-600 dark:bg-accent-400" />
              )}
            </Link>

            <Link
              href="/about"
              className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                path === "/about"
                  ? "text-accent-600 dark:text-accent-400"
                  : "text-secondary hover:text-accent-600 dark:hover:text-accent-400"
              }`}
            >
              Om
              {path === "/about" && (
                <div className="absolute bottom-0 left-0 h-0.5 w-full bg-accent-600 dark:bg-accent-400" />
              )}
            </Link>

            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
