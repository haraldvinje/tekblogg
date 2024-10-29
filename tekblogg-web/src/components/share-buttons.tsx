"use client";

import {
  faLinkedin,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { useAbsoluteUrl } from "@/lib/hooks/use-absolute-url";

export function ShareButtons({ className }: { className?: string }) {
  const url = useAbsoluteUrl();

  return (
    <div className={`flex items-center ${className}`}>
      <p>
        <i>Del: </i>
      </p>
      <a
        href={`https://twitter.com/intent/tweet?text=${url}`}
        title="Del på Twitter"
        target="_blank"
        rel="noreferrer"
        aria-label="Del på Twitter"
      >
        <span className="fa-stack">
          <FontAwesomeIcon
            className="fa-stack-1x"
            icon={faSquare}
            color="#FFFFFF"
            size="2x"
          />
          <FontAwesomeIcon
            className="fa-stack-1x"
            icon={faSquareXTwitter}
            color="#000000"
            size="2x"
          />
        </span>
      </a>
      <a
        href={`https://linkedin.com/share?url=${url}`}
        title="Del på LinkedIn"
        target="_blank"
        rel="noreferrer"
        aria-label="Del på LinkedIn"
      >
        <span className="fa-stack">
          <FontAwesomeIcon
            className="fa-stack-1x"
            icon={faSquare}
            color="#FFFFFF"
            size="2x"
          />
          <FontAwesomeIcon
            className="fa-stack-1x"
            icon={faLinkedin}
            color="#0072b1"
            size="2x"
          />
        </span>
      </a>
    </div>
  );
}
