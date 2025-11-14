"use client";

import { useEffect, useState } from "react";

export function HydrationTest() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("🧪 HydrationTest mounted");
  }, []);

  console.log("🧪 HydrationTest render - mounted:", mounted);

  return (
    <div style={{ display: "none" }}>
      <span data-testid="hydration-test">{mounted ? "client" : "server"}</span>
    </div>
  );
}
