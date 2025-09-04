"use client";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useClientTheme } from "@/lib/hooks/use-client-theme";

export function ThemeSwitcher() {
  const { theme, setTheme, isClientSide } = useClientTheme();

  if (!isClientSide) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-default bg-surface-elevated backdrop-blur-sm transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <FontAwesomeIcon className="h-4 w-4 text-secondary" icon={faSun} />
      ) : (
        <FontAwesomeIcon className="h-4 w-4 text-secondary" icon={faMoon} />
      )}
    </button>
  );
}
