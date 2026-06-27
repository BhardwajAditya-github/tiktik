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
      <div className="flex h-full items-center justify-center text-3xl font-bold">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
    </WidgetWrapper>
  );
}
