"use client";

import { useEffect, useMemo, useState } from "react";

import Canvas from "@/modules/canvas/Canvas";
import { getLayoutBounds } from "@/lib/layout";

import { useExamStore } from "@/store/examStore";
import { useWidgetStore } from "@/store/widgetStore";

export default function PreviewModal() {
  const previewOpen = useExamStore((s) => s.previewOpen);
  const setPreviewOpen = useExamStore((s) => s.setPreviewOpen);

  const widgets = useWidgetStore((s) => s.widgets);

  const bounds = useMemo(() => getLayoutBounds(widgets), [widgets]);

  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!previewOpen) return;

    const updateScale = () => {
      setScale(
        Math.min(
          (window.innerWidth - 80) / bounds.width,
          (window.innerHeight - 140) / bounds.height,
        ),
      );
    };

    updateScale();

    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, [previewOpen, bounds.width, bounds.height]);

  if (!previewOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-6 flex flex-col overflow-hidden rounded-2xl border border-slate-300 bg-slate-100 shadow-2xl">
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b bg-white px-6">
          <h2 className="text-base font-semibold text-slate-800">Preview</h2>

          <button
            onClick={() => setPreviewOpen(false)}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        {/* Canvas */}
        <div className="flex flex-1 items-center justify-center overflow-hidden bg-slate-200 p-6">
          <div
            style={{
              width: bounds.width,
              height: bounds.height,
              zoom: scale,
            }}
          >
            <Canvas editable={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
