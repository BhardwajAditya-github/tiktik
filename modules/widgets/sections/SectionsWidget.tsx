"use client";

import { useState } from "react";
import WidgetWrapper from "../WidgetWrapper";
import type { Widget } from "../widget";
import SectionSettingsDialog from "./SectionSettingsDialog";
import { useSectionStore } from "@/store/sectionStore";
import { Settings } from "lucide-react";

export default function SectionsWidget({
  widget,
  editable,
}: {
  widget: Widget;
  editable: boolean;
}) {
  const sections = useSectionStore((s) => s.sections);
  const current = useSectionStore((s) => s.currentSectionIndex);
  const [open, setOpen] = useState(false);

  return (
    <>
      <WidgetWrapper widget={widget} editable={editable}>
        <div className="flex h-full flex-col p-3">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Sections</h2>

            {editable && (
              <button
                onClick={() => setOpen(true)}
                className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <Settings size={15} />
              </button>
            )}
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition ${
                  index === current
                    ? "border-blue-200 bg-blue-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    section.completed
                      ? "bg-slate-400"
                      : index === current
                        ? "bg-blue-500"
                        : "bg-slate-300"
                  }`}
                />

                <span
                  className={`flex-1 text-sm ${
                    section.completed
                      ? "text-slate-400 line-through"
                      : "text-slate-700"
                  }`}
                >
                  {section.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </WidgetWrapper>

      <SectionSettingsDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
