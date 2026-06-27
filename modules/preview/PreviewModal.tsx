"use client";

import Canvas from "@/modules/canvas/Canvas";
import { useExamStore } from "@/store/examStore";

export default function PreviewModal() {
  const previewOpen = useExamStore((s) => s.previewOpen);
  const setPreviewOpen = useExamStore((s) => s.setPreviewOpen);

  if (!previewOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60">
      <div className="absolute inset-6 rounded-xl bg-slate-200 shadow-2xl">
        <div className="flex h-14 items-center justify-between border-b bg-white px-6">
          <h2 className="text-lg font-semibold">Preview</h2>

          <button
            onClick={() => setPreviewOpen(false)}
            className="rounded-lg border px-4 py-2"
          >
            Close
          </button>
        </div>

        <div className="h-[calc(100%-56px)] p-6">
          <Canvas editable={false} />
        </div>
      </div>
    </div>
  );
}
