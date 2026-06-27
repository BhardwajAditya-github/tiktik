export type WidgetType = "pdf" | "timer" | "sections" | "current-section";

export type WidgetConfig = Record<string, unknown>;

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;

  x: number;
  y: number;

  width: number;
  height: number;

  minWidth?: number;
  minHeight?: number;

  maxWidth?: number;
  maxHeight?: number;

  draggable?: boolean;
  resizable?: boolean;

  locked?: boolean;
  visible?: boolean;

  config: WidgetConfig;
}
