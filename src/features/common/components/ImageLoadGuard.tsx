"use client";

import { useEffect } from "react";

const markImageStatus = (img: HTMLImageElement) => {
  if (img.dataset.loaded === "true" || img.dataset.error === "true") {
    return;
  }

  if (!img.complete) {
    return;
  }

  if (img.naturalWidth > 0) {
    img.dataset.loaded = "true";
    return;
  }

  img.dataset.error = "true";
};

export default function ImageLoadGuard() {
  useEffect(() => {
    const handleLoad = (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLImageElement)) {
        return;
      }

      target.dataset.loaded = "true";
      delete target.dataset.error;
    };

    const handleError = (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLImageElement)) {
        return;
      }

      target.dataset.error = "true";
      delete target.dataset.loaded;
    };

    document.querySelectorAll("img").forEach(markImageStatus);
    document.addEventListener("load", handleLoad, true);
    document.addEventListener("error", handleError, true);

    return () => {
      document.removeEventListener("load", handleLoad, true);
      document.removeEventListener("error", handleError, true);
    };
  }, []);

  return null;
}
