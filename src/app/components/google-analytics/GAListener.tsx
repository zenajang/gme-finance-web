"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GAListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag || !GA_ID) return;

    const url =
      pathname + (searchParams.toString() ? `?${searchParams}` : "");

    window.gtag("config", GA_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}
