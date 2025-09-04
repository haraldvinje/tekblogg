"use client";

import {
  faLinkedin,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAbsoluteUrl } from "@/lib/hooks/use-absolute-url";

export function ShareButtons({ className }: { className?: string }) {
  const url = useAbsoluteUrl();

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <span className="text-sm font-medium text-secondary">Del:</span>

      <a
        href={`https://twitter.com/intent/tweet?text=${url}`}
        title="Del på Twitter"
        target="_blank"
        rel="noreferrer"
        aria-label="Del på Twitter"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-200 hover:bg-blue-500 hover:text-white dark:bg-gray-800 dark:hover:bg-blue-500"
      >
        <FontAwesomeIcon className="h-4 w-4" icon={faSquareXTwitter} />
      </a>

      <a
        href={`https://linkedin.com/share?url=${url}`}
        title="Del på LinkedIn"
        target="_blank"
        rel="noreferrer"
        aria-label="Del på LinkedIn"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-colors duration-200 hover:bg-blue-600 hover:text-white dark:bg-gray-800 dark:hover:bg-blue-600"
      >
        <FontAwesomeIcon className="h-4 w-4" icon={faLinkedin} />
      </a>
    </div>
  );
}
