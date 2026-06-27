"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Widget, WidgetType } from "@/modules/widgets/widget";
import { createWidget } from "@/modules/widgets/widgetFactory";

interface WidgetStore {
  widgets: Widget[];

  addWidget: (widget: Widget) => void;

  addWidgetByType: (type: WidgetType) => void;

  removeWidget: (id: string) => void;

  updateWidget: (id: string, updates: Partial<Widget>) => void;
}

export const useWidgetStore = create<WidgetStore>()(
  persist(
    (set) => ({
      widgets: [],

      addWidget: (widget) =>
        set((state) => ({
          widgets: [...state.widgets, widget],
        })),

      addWidgetByType: (type) =>
        set((state) => ({
          widgets: [...state.widgets, createWidget(type)],
        })),

      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((widget) => widget.id !== id),
        })),

      updateWidget: (id, updates) =>
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id ? { ...widget, ...updates } : widget,
          ),
        })),
    }),
    {
      name: "ticktick-widgets",
    },
  ),
);
