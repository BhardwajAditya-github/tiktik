"use client";

import { create } from "zustand";

interface ExamStore {
  previewOpen: boolean;
  examRunning: boolean;

  setPreviewOpen: (open: boolean) => void;

  startExam: () => void;

  stopExam: () => void;
}

export const useExamStore = create<ExamStore>((set) => ({
  previewOpen: false,

  examRunning: false,

  setPreviewOpen: (open) =>
    set({
      previewOpen: open,
    }),

  startExam: () =>
    set({
      examRunning: true,
    }),

  stopExam: () =>
    set({
      examRunning: false,
    }),
}));
