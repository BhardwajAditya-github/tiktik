"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ExamSection {
  id: string;
  name: string;
  durationMinutes: number;
  completed: boolean;
}

interface SectionStore {
  sectionalTiming: boolean;

  setSectionalTiming: (value: boolean) => void;

  sections: ExamSection[];

  currentSectionIndex: number;

  setSections: (sections: ExamSection[]) => void;

  setCurrentSection: (index: number) => void;

  completeCurrentSection: () => void;

  resetSections: () => void;
  completeSection: (index: number) => void;
  nextSection: () => void;
}

export const useSectionStore = create<SectionStore>()(
  persist(
    (set) => ({
      sectionalTiming: true,

      setSectionalTiming: (value) =>
        set({
          sectionalTiming: value,
        }),

      currentSectionIndex: 0,

      sections: [
        {
          id: crypto.randomUUID(),
          name: "Reasoning",
          durationMinutes: 15,
          completed: false,
        },
        {
          id: crypto.randomUUID(),
          name: "General Awareness",
          durationMinutes: 15,
          completed: false,
        },
        {
          id: crypto.randomUUID(),
          name: "Quantitative Aptitude",
          durationMinutes: 15,
          completed: false,
        },
        {
          id: crypto.randomUUID(),
          name: "English",
          durationMinutes: 15,
          completed: false,
        },
      ],

      setSections: (sections) =>
        set({
          sections,
        }),

      setCurrentSection: (index) =>
        set({
          currentSectionIndex: index,
        }),

      completeCurrentSection: () =>
        set((state) => ({
          sections: state.sections.map((section, index) =>
            index === state.currentSectionIndex
              ? {
                  ...section,
                  completed: true,
                }
              : section,
          ),
          currentSectionIndex: Math.min(
            state.currentSectionIndex + 1,
            state.sections.length - 1,
          ),
        })),

      resetSections: () =>
        set((state) => ({
          currentSectionIndex: 0,
          sections: state.sections.map((section) => ({
            ...section,
            completed: false,
          })),
        })),
      completeSection: (index) =>
        set((state) => ({
          sections: state.sections.map((section, i) =>
            i === index
              ? {
                  ...section,
                  completed: true,
                }
              : section,
          ),
        })),

      nextSection: () =>
        set((state) => ({
          currentSectionIndex: Math.min(
            state.currentSectionIndex + 1,
            state.sections.length - 1,
          ),
        })),
    }),
    {
      name: "ticktick-sections",
    },
  ),
);
