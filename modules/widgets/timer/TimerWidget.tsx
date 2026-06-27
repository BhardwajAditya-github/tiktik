"use client";

import { useEffect } from "react";

import WidgetWrapper from "../WidgetWrapper";
import type { Widget } from "../widget";

import { useTimerStore } from "@/store/timerStore";
import { useWidgetTypography } from "@/hooks/useWidgetTypography";

export default function TimerWidget({
  widget,
  editable,
}: {
  widget: Widget;
  editable: boolean;
}) {
  const remaining = useTimerStore((s) => s.remainingSeconds);
  const running = useTimerStore((s) => s.running);

  const sectionRemaining = useTimerStore((s) => s.currentSectionRemaining);

  const { ref, typography } = useWidgetTypography();

  useEffect(() => {
    if (!running || editable) return;

    const interval = setInterval(() => {
      useTimerStore.getState().tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [running, editable]);

  const sm = Math.floor(sectionRemaining / 60);
  const ss = sectionRemaining % 60;

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <WidgetWrapper widget={widget} editable={editable}>
      <div ref={ref} className="h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
          {/* Section */}
          <div className="flex flex-1 flex-col items-center justify-center px-2 py-0">
            <p
              className="uppercase tracking-wider text-slate-500"
              style={{ fontSize: typography.label }}
            >
              Section
            </p>

            <p
              className="font-mono font-bold leading-none text-blue-600"
              style={{
                fontSize: typography.value,
              }}
            >
              {String(sm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
            </p>
          </div>

          <div className="mx-4 border-t border-slate-200" />

          {/* Overall */}
          <div className="flex flex-1 flex-col items-center justify-center px-2 py-0">
            <p
              className="uppercase tracking-wider text-slate-500"
              style={{ fontSize: typography.label }}
            >
              Overall
            </p>

            <p
              className="font-mono font-semibold leading-none text-slate-800"
              style={{
                fontSize: typography.valueLarge,
              }}
            >
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </WidgetWrapper>
  );
}
