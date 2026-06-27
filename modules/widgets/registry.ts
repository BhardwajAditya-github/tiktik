import TimerWidget from "./timer/TimerWidget";
import SectionsWidget from "./sections/SectionsWidget";
import CurrentSectionWidget from "./current-section/CurrentSectionWidget";
import dynamic from "next/dynamic";

const PDFWidget = dynamic(() => import("./pdf/PDFWidget"), {
  ssr: false,
});

export const WidgetRegistry = {
  pdf: {
    component: PDFWidget,
    title: "PDF Viewer",
    defaults: {
      width: 600,
      height: 550,
      minWidth: 0,
      minHeight: 0,
      draggable: true,
      resizable: true,
    },
  },

  timer: {
    component: TimerWidget,
    title: "Timer",
    defaults: {
      width: 140,
      height: 120,
      minWidth: 0,
      minHeight: 0,
      draggable: true,
      resizable: true,
    },
  },

  sections: {
    component: SectionsWidget,
    title: "Sections",
    defaults: {
      width: 200,
      height: 260,
      minWidth: 0,
      minHeight: 0,
      draggable: true,
      resizable: true,
    },
  },

  "current-section": {
    component: CurrentSectionWidget,
    title: "Current Section",
    defaults: {
      width: 150,
      height: 100,
      minWidth: 0,
      minHeight: 0,
      draggable: true,
      resizable: true,
    },
  },
} as const;
