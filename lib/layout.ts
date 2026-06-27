import type { Widget } from "@/modules/widgets/widget";

export function getLayoutBounds(widgets: Widget[]) {
  if (widgets.length === 0) {
    return {
      width: 1200,
      height: 800,
    };
  }

  let maxRight = 0;
  let maxBottom = 0;

  widgets.forEach((widget) => {
    maxRight = Math.max(maxRight, widget.x + widget.width);
    maxBottom = Math.max(maxBottom, widget.y + widget.height);
  });

  return {
    width: maxRight + 40,
    height: maxBottom + 40,
  };
}
