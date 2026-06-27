"use client";

import { Widget } from "./widget";
import { WidgetRegistry } from "./registry";

interface Props {
  widget: Widget;
  editable: boolean;
}

export default function WidgetRenderer({ widget, editable }: Props) {
  const Component = WidgetRegistry[widget.type];

  if (!Component) return null;

  return <Component widget={widget} editable={editable} />;
}
