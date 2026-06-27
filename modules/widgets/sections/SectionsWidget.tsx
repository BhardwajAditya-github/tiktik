"use client";

import type { Widget } from "../widget";
import WidgetWrapper from "../WidgetWrapper";

interface Props {
  widget: Widget;
}

const mockSections = [
  "Reasoning",
  "General Awareness",
  "Quantitative Aptitude",
  "English",
];

export default function SectionsWidget({
  widget,
  editable,
}: Props & { editable: boolean }) {
  return (
    <WidgetWrapper widget={widget} editable={editable}>
      <div className="h-full p-4">
        <h2 className="mb-4 text-lg font-semibold">Sections</h2>

        <div className="flex flex-col gap-2">
          {mockSections.map((section, index) => (
            <button
              key={index}
              className="rounded-lg border p-2 text-left transition hover:bg-slate-100"
            >
              {section}
            </button>
          ))}
        </div>
      </div>
    </WidgetWrapper>
  );
}
