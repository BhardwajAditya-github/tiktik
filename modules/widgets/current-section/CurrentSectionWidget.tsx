"use client";

import WidgetWrapper from "../WidgetWrapper";
import type { Widget } from "../widget";

import { useSectionStore } from "@/store/sectionStore";

export default function CurrentSectionWidget({
  widget,
  editable,
}: {
  widget: Widget;
  editable: boolean;
}) {
  const sections = useSectionStore((s) => s.sections);
  const current = useSectionStore((s) => s.currentSectionIndex);

  return (
    <WidgetWrapper widget={widget} editable={editable}>
      <div className="flex h-full flex-col items-center justify-center px-4 text-center">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Current Section
        </p>

        <h3 className="mt-3 text-lg font-semibold leading-snug break-words">
          {sections[current]?.name}
        </h3>
      </div>
    </WidgetWrapper>
  );
}
