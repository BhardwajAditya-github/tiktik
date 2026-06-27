import type { Widget, WidgetType } from "./widget";

export function createWidget(type: WidgetType): Widget {
  const id = crypto.randomUUID();

  switch (type) {
    case "pdf":
      return {
        id,
        type,
        title: "PDF Viewer",

        x: 20,
        y: 20,

        width: 700,
        height: 600,

        draggable: true,
        resizable: true,

        visible: true,

        config: {},
      };

    case "timer":
      return {
        id,
        type,
        title: "Timer",

        x: 760,
        y: 20,

        width: 220,
        height: 100,

        draggable: true,
        resizable: true,

        visible: true,

        config: {},
      };

    case "sections":
      return {
        id,
        type,
        title: "Sections",

        x: 760,
        y: 140,

        width: 220,
        height: 250,

        draggable: true,
        resizable: true,

        visible: true,

        config: {},
      };

    case "current-section":
      return {
        id,
        type,
        title: "Current Section",

        x: 760,
        y: 410,

        width: 220,
        height: 120,

        draggable: true,
        resizable: true,

        visible: true,

        config: {},
      };
  }
}
