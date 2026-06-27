"use client";

import { FileText, Timer, List, Target } from "lucide-react";
import { useWidgetStore } from "@/store/widgetStore";

export default function RightSidebar() {
  const addWidget = useWidgetStore((state) => state.addWidgetByType);

  const widgets = [
    {
      title: "PDF Viewer",
      type: "pdf" as const,
      icon: <FileText size={18} />,
    },
    {
      title: "Timer",
      type: "timer" as const,
      icon: <Timer size={18} />,
    },
    {
      title: "Sections",
      type: "sections" as const,
      icon: <List size={18} />,
    },
    {
      title: "Current Section",
      type: "current-section" as const,
      icon: <Target size={18} />,
    },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Widget Library</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-3">
          {widgets.map((widget) => (
            <button
              key={widget.type}
              onClick={() => addWidget(widget.type)}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                border
                bg-white
                p-3
                transition
                hover:bg-slate-100
              "
            >
              {widget.icon}

              <span className="font-medium">{widget.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
