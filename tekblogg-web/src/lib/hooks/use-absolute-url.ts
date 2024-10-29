import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import absoluteUrl from "next-absolute-url";

export const useAbsoluteUrl = () => {
  const [url, setUrl] = useState("");
  const path = usePathname();

  useEffect(() => {
    const { host } = absoluteUrl();
    setUrl(host + path);
  }, [path]);

  return url;
};
