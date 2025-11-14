"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/lib/text-utils";

interface ClientDateProps {
  date: string;
  timeFormat?: string;
  className?: string;
}

export function ClientDate({ date, timeFormat, className }: ClientDateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <time className={className} dateTime={date}>
        {new Date(date).toLocaleDateString("nb-NO")}
      </time>
    );
  }

  return (
    <time className={className} dateTime={date}>
      {formatDate(date, timeFormat)}
    </time>
  );
}
