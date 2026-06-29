"use client";

import { create } from "zustand";

interface PDFStore {
  pdfFile: File | null;

  pdfUrl: string | null;

  hideGreen: boolean;
  hideRed: boolean;
  hideYellow: boolean;
  removeAnswers: boolean;

  setRemoveAnswers: (value: boolean) => void;

  setPDF: (file: File) => void;

  setHideGreen: (value: boolean) => void;
  setHideRed: (value: boolean) => void;
  setHideYellow: (value: boolean) => void;

  clearPDF: () => void;
  setPDFBlob: (blob: Blob) => void;
}

export const usePDFStore = create<PDFStore>((set) => ({
  pdfFile: null,
  pdfUrl: null,

  hideGreen: true,
  hideRed: true,
  hideYellow: true,

  removeAnswers: false,

  setRemoveAnswers: (value) =>
    set({
      removeAnswers: value,
    }),

  setPDF: (file) =>
    set({
      pdfFile: file,
      pdfUrl: URL.createObjectURL(file),
    }),

  setHideGreen: (value) =>
    set({
      hideGreen: value,
    }),

  setHideRed: (value) =>
    set({
      hideRed: value,
    }),

  setHideYellow: (value) =>
    set({
      hideYellow: value,
    }),

  clearPDF: () =>
    set({
      pdfFile: null,
      pdfUrl: null,
    }),
  setPDFBlob: (blob) =>
    set({
      pdfUrl: URL.createObjectURL(blob),
    }),
}));
