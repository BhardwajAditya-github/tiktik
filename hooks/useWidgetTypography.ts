"use client";

import { useEffect, useRef, useState } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function useWidgetTypography() {
  const ref = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
      setHeight(entry.contentRect.height);
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const base = Math.min(width, height);

  return {
    ref,

    typography: {
      label: clamp(base * 0.05, 9, 12),
      value: clamp(base * 0.14, 18, 34),
      valueLarge: clamp(base * 0.17, 20, 40),
    },

    spacing: {
      gap: clamp(base * 0.03, 6, 18),
      padding: clamp(base * 0.04, 8, 18),
      radius: clamp(base * 0.03, 8, 16),
    },

    size: {
      width,
      height,
      compact: height < 180,
      tiny: height < 130,
    },
  };
}
