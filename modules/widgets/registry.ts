import TimerWidget from "./timer/TimerWidget";
import SectionsWidget from "./sections/SectionsWidget";
import CurrentSectionWidget from "./current-section/CurrentSectionWidget";

import dynamic from "next/dynamic";

const PDFWidget = dynamic(() => import("./pdf/PDFWidget"), {
  ssr: false,
});

export const WidgetRegistry = {
  pdf: PDFWidget,
  timer: TimerWidget,
  sections: SectionsWidget,
  "current-section": CurrentSectionWidget,
} as const;

export type WidgetType = "pdf" | "timer" | "sections" | "current-section";

export type WidgetConfig = Record<string, unknown>;

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;

  x: number;
  y: number;

  w: number;
  h: number;

  minW?: number;
  minH?: number;

  maxW?: number;
  maxH?: number;

  locked?: boolean;
  visible?: boolean;

  config: WidgetConfig;
}
