"use client";

import Grid from "./Grid";

import WidgetRenderer from "@/modules/widgets/WidgetRenderer";
import { useWidgetStore } from "@/store/widgetStore";

interface CanvasProps {
  editable?: boolean;
}

export default function Canvas({ editable = true }: CanvasProps) {
  const widgets = useWidgetStore((state) => state.widgets);
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border bg-white">
      <Grid />

      {widgets
        .filter((widget) => widget.visible !== false)
        .map((widget) => (
          <WidgetRenderer key={widget.id} widget={widget} editable={editable} />
        ))}
    </div>
  );
}
