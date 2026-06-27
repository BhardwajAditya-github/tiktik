"use client";

import { create } from "zustand";

import { useSectionStore } from "./sectionStore";

interface TimerStore {
  totalSeconds: number;

  remainingSeconds: number;

  currentSectionRemaining: number;

  running: boolean;

  start: () => void;

  stop: () => void;

  tick: () => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  totalSeconds: 3600,

  remainingSeconds: 3600,

  currentSectionRemaining: 0,

  running: false,

  start: () => {
    const sectionStore = useSectionStore.getState();

    sectionStore.resetSections();
    const sections = sectionStore.sections;

    const totalSeconds = sections.reduce(
      (sum, section) => sum + section.durationMinutes * 60,
      0,
    );

    const first = sections[0];

    set({
      totalSeconds,
      remainingSeconds: totalSeconds,
      currentSectionRemaining: (first?.durationMinutes ?? 0) * 60,
      running: true,
    });
  },

  stop: () =>
    set({
      running: false,
    }),

  tick: () => {
    const { remainingSeconds, currentSectionRemaining } = get();

    if (remainingSeconds <= 0) {
      set({
        running: false,
        remainingSeconds: 0,
      });

      return;
    }

    let nextSectionRemaining = currentSectionRemaining - 1;

    if (nextSectionRemaining <= 0) {
      const store = useSectionStore.getState();

      const current = store.currentSectionIndex;

      store.completeSection(current);

      store.nextSection();

      const next = useSectionStore.getState().sections[current + 1];

      if (next) {
        nextSectionRemaining = next.durationMinutes * 60;
      }

      new Audio("/bell.mp3").play().catch(() => {});
    }

    set({
      remainingSeconds: remainingSeconds - 1,

      currentSectionRemaining: nextSectionRemaining,
    });
  },
}));
