"use client";

import { create } from "zustand";

interface PDFStore {
  pdfFile: File | null;

  pdfUrl: string | null;

  setPDF: (file: File) => void;

  clearPDF: () => void;
}

export const usePDFStore = create<PDFStore>((set) => ({
  pdfFile: null,

  pdfUrl: null,

  setPDF: (file) =>
    set({
      pdfFile: file,
      pdfUrl: URL.createObjectURL(file),
    }),

  clearPDF: () =>
    set({
      pdfFile: null,
      pdfUrl: null,
    }),
}));
