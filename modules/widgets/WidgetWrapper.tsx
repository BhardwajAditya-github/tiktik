"use client";

import { Rnd } from "react-rnd";

import type { Widget } from "./widget";
import { useWidgetStore } from "@/store/widgetStore";

interface Props {
  widget: Widget;
  editable: boolean;
  children: React.ReactNode;
}

export default function WidgetWrapper({
  widget,
  children,
  editable,
}: Props & { editable: boolean }) {
  const updateWidget = useWidgetStore((state) => state.updateWidget);
  if (!editable) {
    return (
      <div
        style={{
          position: "absolute",
          left: widget.x,
          top: widget.y,
          width: widget.width,
          height: widget.height,
        }}
      >
        <div className="flex h-full flex-col rounded-xl border bg-white shadow-md">
          <div className="flex h-10 items-center border-b bg-slate-100 px-3">
            <span className="text-sm font-medium">{widget.title}</span>
          </div>

          <div className="relative flex-1 overflow-hidden">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <Rnd
      position={{
        x: widget.x,
        y: widget.y,
      }}
      size={{
        width: widget.width,
        height: widget.height,
      }}
      onDragStop={(e, d) => {
        if (!editable) return;

        updateWidget(widget.id, {
          x: d.x,
          y: d.y,
        });
      }}
      onResizeStop={(e, dir, ref, delta, position) => {
        if (!editable) return;

        updateWidget(widget.id, {
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
          x: position.x,
          y: position.y,
        });
      }}
      bounds="parent"
      disableDragging={!editable}
      enableResizing={editable}
    >
      <div className="flex h-full flex-col rounded-xl border bg-white shadow-md">
        <div className="widget-header relative z-50 flex h-10 cursor-move items-center justify-between border-b bg-slate-100 px-3">
          <span className="text-sm font-medium">{widget.title}</span>
        </div>

        <div className="relative flex-1 overflow-hidden">{children}</div>
      </div>
    </Rnd>
  );
}
