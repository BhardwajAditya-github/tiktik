import { WidgetRegistry } from "./registry";
import type { Widget, WidgetType } from "./widget";

const defaultPosition = {
  pdf: { x: 20, y: 20 },
  timer: { x: 700, y: 20 },
  sections: { x: 640, y: 170 },
  "current-section": { x: 690, y: 450 },
};

export function createWidget(type: WidgetType): Widget {
  const meta = WidgetRegistry[type];

  return {
    id: crypto.randomUUID(),

    type,
    title: meta.title,

    x: defaultPosition[type].x,
    y: defaultPosition[type].y,

    ...meta.defaults,

    visible: true,

    config: {},
  };
}
