"use client";

import { ErrorBoundary } from "react-error-boundary";
import { ReactNode } from "react";

function ErrorFallback({ error }: { error: Error }) {
  console.error("Hydration Error Details:", error);
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded">
      <h2 className="text-red-800 font-bold">Something went wrong:</h2>
      <details className="mt-2">
        <summary className="cursor-pointer text-red-700">Error details</summary>
        <pre className="mt-2 text-xs text-red-600 overflow-auto">
          {error.message}
        </pre>
      </details>
    </div>
  );
}

export function HydrationErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback error={new Error("A hydration error occurred.")} />
      }
    >
      {children}
    </ErrorBoundary>
  );
}
