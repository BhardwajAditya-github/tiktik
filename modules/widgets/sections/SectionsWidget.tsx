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
        <div className="h-full p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Sections</h2>

            {editable && (
              <button
                onClick={() => setOpen(true)}
                className="rounded p-1 hover:bg-slate-100"
              >
                <Settings size={18} />
              </button>
            )}
          </div>

          <div className="space-y-2">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`rounded-lg border p-2 transition ${
                  index === current ? "border-blue-500 bg-blue-50" : "bg-white"
                }`}
              >
                <span
                  className={
                    section.completed ? "text-slate-400 line-through" : ""
                  }
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
