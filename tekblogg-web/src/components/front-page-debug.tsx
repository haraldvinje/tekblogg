"use client";

import { useEffect } from "react";

export function FrontPageDebug() {
  useEffect(() => {
    // Capture hydration errors specifically
    const originalError = console.error;
    console.error = (...args) => {
      const message = args[0];
      if (
        typeof message === "string" &&
        (message.includes("418") || message.includes("Hydration"))
      ) {
        console.group("🔥 FRONT PAGE HYDRATION ERROR");
        console.error("Args:", args);
        console.error("Stack trace:", new Error().stack);

        // Log all current DOM text content
        const allText = Array.from(document.querySelectorAll("*"))
          .map((el) => el.textContent?.trim())
          .filter((text) => text && text.length > 0)
          .slice(0, 20); // First 20 text elements

        console.error("Current DOM text:", allText);
        console.groupEnd();
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}
