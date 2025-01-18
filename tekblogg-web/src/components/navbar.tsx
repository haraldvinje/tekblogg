"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./theme-switcher";

export function Navbar() {
  const path = usePathname();

  return (
    <nav className="top-0 z-20 flex h-16 w-full bg-dark text-white sm:h-20">
      <div className="w-[5%] xl:w-[20%]"></div>
      <div className="flex grow items-center justify-between space-x-2">
        <Link
          href="/"
          className={`flex items-center text-2xl leading-snug transition duration-300 ease-in-out hover:opacity-60 sm:p-2 ${
            path === "/" && "font-extrabold"
          }`}
        >
          Blogg
        </Link>
        <ThemeSwitcher />
        <Link
          href="/about"
          className={`flex items-center text-2xl leading-snug transition duration-300 ease-in-out hover:opacity-60 sm:p-2 ${
            path === "/about" && "font-extrabold"
          }`}
        >
          Info
        </Link>
      </div>
      <div className="flex w-[5%] xl:w-[20%]"></div>
    </nav>
  );
}
