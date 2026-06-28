"use client";

import {
  FileText,
  Timer,
  List,
  Target,
  Plus,
  Trash2,
  ClipboardList,
} from "lucide-react";
import { useWidgetStore } from "@/store/widgetStore";

export default function RightSidebar() {
  const addWidget = useWidgetStore((state) => state.addWidgetByType);
  const clearWidgets = useWidgetStore((state) => state.clearWidgets);

  const widgets = [
    {
      title: "PDF Viewer",
      type: "pdf" as const,
      icon: <FileText size={16} />,
    },
    {
      title: "Timer",
      type: "timer" as const,
      icon: <Timer size={16} />,
    },
    {
      title: "Sections",
      type: "sections" as const,
      icon: <List size={16} />,
    },
    {
      title: "Current Section",
      type: "current-section" as const,
      icon: <Target size={16} />,
    },
    {
      title: "Answer Sheet",
      type: "answer-sheet" as const,
      icon: <ClipboardList size={16} />,
    },
  ];

  return (
    <div className="flex h-full flex-col border-l border-slate-200 bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-5">
        <h2 className="text-base font-semibold text-slate-800">
          Widget Library
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Add widgets to your workspace
        </p>
      </div>

      {/* Widget List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {widgets.map((widget) => (
            <button
              key={widget.type}
              onClick={() => addWidget(widget.type)}
              className="group flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5 transition-all hover:border-blue-300 hover:bg-blue-50"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-slate-100 p-2 text-slate-600 transition group-hover:bg-blue-100 group-hover:text-blue-600">
                  {widget.icon}
                </div>

                <span className="text-sm font-medium text-slate-700">
                  {widget.title}
                </span>
              </div>

              <Plus
                size={16}
                className="text-slate-400 transition group-hover:text-blue-600"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <button
          onClick={clearWidgets}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <Trash2 size={15} />
          Clear Canvas
        </button>
      </div>
    </div>
  );
}
