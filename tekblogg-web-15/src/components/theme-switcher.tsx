"use client";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useClientTheme } from "@/lib/hooks/use-client-theme";

export function ThemeSwitcher() {
  const { theme, setTheme, isClientSide } = useClientTheme();

  const iconStyle =
    "h-4 sm:h-6 text-white transition duration-300 ease-in-out hover:opacity-70 p-2";

  if (!isClientSide) {
    return null;
  }

  return (
    <>
      {theme === "dark" ? (
        <button
          className="flex flex-col items-center"
          onClick={() => setTheme("light")}
          aria-label="Switch to light mode"
        >
          <FontAwesomeIcon className={iconStyle} icon={faSun} color="white" />
        </button>
      ) : (
        <button
          className="flex flex-col items-center"
          onClick={() => setTheme("dark")}
          aria-label="Switch to dark mode"
        >
          <FontAwesomeIcon className={iconStyle} icon={faMoon} color="white" />
        </button>
      )}
    </>
  );
}
