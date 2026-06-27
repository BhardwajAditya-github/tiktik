"use client";

import { useEffect } from "react";

import WidgetWrapper from "../WidgetWrapper";
import type { Widget } from "../widget";

import { useTimerStore } from "@/store/timerStore";

export default function TimerWidget({
  widget,
  editable,
}: {
  widget: Widget;
  editable: boolean;
}) {
  const remaining = useTimerStore((s) => s.remainingSeconds);
  const running = useTimerStore((s) => s.running);
  const tick = useTimerStore((s) => s.tick);
  const sectionRemaining = useTimerStore((s) => s.currentSectionRemaining);

  const sm = Math.floor(sectionRemaining / 60);
  const ss = sectionRemaining % 60;

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [running, tick]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <WidgetWrapper widget={widget} editable={editable}>
      <div className="flex h-full flex-col items-center justify-center">
        <div className="text-xs text-slate-500">Section</div>

        <div className="text-xl font-bold text-blue-600">
          {String(sm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
        </div>

        <div className="mt-2 text-xs text-slate-500">Overall</div>

        <div className="text-2xl font-bold">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
      </div>
    </WidgetWrapper>
  );
}
