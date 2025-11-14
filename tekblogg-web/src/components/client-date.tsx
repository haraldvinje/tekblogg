"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/lib/text-utils";

interface ClientDateProps {
  date: string;
  timeFormat?: string;
  className?: string;
  skeleton?: boolean;
}

export function ClientDate({
  date,
  timeFormat,
  className,
  skeleton = false,
}: ClientDateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    if (skeleton) {
      return (
        <time className={`${className} animate-pulse`} dateTime={date}>
          <span className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-20 block"></span>
        </time>
      );
    }
    return <time className={className} dateTime={date} />;
  }

  return (
    <time className={className} dateTime={date}>
      {formatDate(date, timeFormat)}
    </time>
  );
}
