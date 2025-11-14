"use client";

import { useEffect } from "react";

export function HydrationDebug() {
  useEffect(() => {
    // Enhanced error logging for hydration issues
    const originalError = console.error;
    console.error = (...args) => {
      const message = args[0];
      if (typeof message === "string" && message.includes("Hydration")) {
        console.group("🚨 HYDRATION ERROR DETAILS");
        console.error("Original error:", ...args);
        console.error("User agent:", navigator.userAgent);
        console.error("URL:", window.location.href);
        console.error("Timestamp:", new Date().toISOString());

        // Log all text nodes to find differences
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          null,
        );

        const textNodes: string[] = [];
        let node;
        while ((node = walker.nextNode())) {
          const text = node.textContent?.trim();
          if (text) {
            textNodes.push(text);
          }
        }

        console.error("All text nodes:", textNodes);
        console.groupEnd();
      }
      originalError.apply(console, args);
    };

    // Listen for React error boundaries
    window.addEventListener("error", (e) => {
      if (e.message.includes("418") || e.message.includes("Hydration")) {
        console.group("🔍 ERROR EVENT DETAILS");
        console.error("Error object:", e.error);
        console.error("Stack:", e.error?.stack);
        console.error("Message:", e.message);
        console.error("Filename:", e.filename);
        console.error("Line/Col:", `${e.lineno}:${e.colno}`);
        console.groupEnd();
      }
    });

    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}
