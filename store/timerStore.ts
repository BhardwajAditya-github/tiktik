"use client";

import { create } from "zustand";

interface TimerStore {
  totalSeconds: number;
  remainingSeconds: number;
  running: boolean;

  start: (seconds?: number) => void;
  stop: () => void;
  tick: () => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  totalSeconds: 3600,
  remainingSeconds: 3600,

  running: false,

  start: (seconds = get().totalSeconds) =>
    set({
      totalSeconds: seconds,
      remainingSeconds: seconds,
      running: true,
    }),

  stop: () =>
    set({
      running: false,
    }),

  tick: () => {
    const { remainingSeconds } = get();

    if (remainingSeconds <= 0) {
      set({
        running: false,
        remainingSeconds: 0,
      });

      return;
    }

    set({
      remainingSeconds: remainingSeconds - 1,
    });
  },
}));
