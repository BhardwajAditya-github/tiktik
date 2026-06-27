"use client";

import { useEffect, useMemo, useState } from "react";

import Canvas from "@/modules/canvas/Canvas";
import { getLayoutBounds } from "@/lib/layout";

import { useExamStore } from "@/store/examStore";
import { useTimerStore } from "@/store/timerStore";
import { useWidgetStore } from "@/store/widgetStore";

export default function ExamOverlay() {
  const examRunning = useExamStore((s) => s.examRunning);
  const stopExam = useExamStore((s) => s.stopExam);

  const widgets = useWidgetStore((s) => s.widgets);

  const startTimer = useTimerStore((s) => s.start);
  const stopTimer = useTimerStore((s) => s.stop);

  const bounds = useMemo(() => getLayoutBounds(widgets), [widgets]);

  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!examRunning) return;

    startTimer();

    const updateScale = () => {
      setScale(
        Math.min(
          (window.innerWidth - 24) / bounds.width,
          (window.innerHeight - 80) / bounds.height,
        ),
      );
    };

    const enterFullscreen = async () => {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        }
      } catch {
        // Ignore fullscreen errors
      }

      updateScale();
    };

    enterFullscreen();

    window.addEventListener("resize", updateScale);
    document.addEventListener("fullscreenchange", updateScale);

    return () => {
      stopTimer();

      window.removeEventListener("resize", updateScale);
      document.removeEventListener("fullscreenchange", updateScale);

      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, [examRunning, bounds.width, bounds.height, startTimer, stopTimer]);

  if (!examRunning) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-200">
      <div className="flex h-14 items-center justify-between border-b bg-white px-6">
        <h2 className="text-lg font-semibold">Exam Running</h2>

        <button
          onClick={() => {
            stopTimer();
            stopExam();

            if (document.fullscreenElement) {
              document.exitFullscreen();
            }
          }}
          className="rounded-lg bg-red-600 px-4 py-2 text-white"
        >
          Exit Exam
        </button>
      </div>

      <div className="flex h-[calc(100%-56px)] items-center justify-center overflow-hidden bg-slate-200">
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
  );
}
