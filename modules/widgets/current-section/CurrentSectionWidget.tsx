"use client";

import type { Widget } from "../widget";
import WidgetWrapper from "../WidgetWrapper";

interface Props {
  widget: Widget;
  editable: boolean;
}

export default function CurrentSectionWidget({
  widget,
  editable,
}: Props & { editable: boolean }) {
  return (
    <WidgetWrapper widget={widget} editable={editable}>
      <div className="flex h-full flex-col items-center justify-center p-4">
        <p className="text-sm text-slate-500">Current Section</p>

        <h2 className="mt-2 text-2xl font-bold">Reasoning</h2>
      </div>
    </WidgetWrapper>
  );
}
