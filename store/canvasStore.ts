"use client";

import { create } from "zustand";

interface CanvasStore {
  zoom: number;

  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

export const useCanvasStore = create<CanvasStore>((set) => ({
  zoom: 1,

  zoomIn: () =>
    set((state) => ({
      zoom: Math.min(state.zoom + 0.1, 2),
    })),

  zoomOut: () =>
    set((state) => ({
      zoom: Math.max(state.zoom - 0.1, 0.4),
    })),

  resetZoom: () =>
    set({
      zoom: 1,
    }),
}));
