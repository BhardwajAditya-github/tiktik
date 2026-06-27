"use client";

import { Rnd } from "react-rnd";
import { Trash2 } from "lucide-react";

import type { Widget } from "./widget";
import { useWidgetStore } from "@/store/widgetStore";

interface Props {
  widget: Widget;
  editable: boolean;
  children: React.ReactNode;
}

export default function WidgetWrapper({ widget, children, editable }: Props) {
  const updateWidget = useWidgetStore((state) => state.updateWidget);
  const removeWidget = useWidgetStore((state) => state.removeWidget);

  const Content = (
    <div className="group relative flex h-full flex-col rounded-xl border border-slate-200 bg-white shadow-md">
      {editable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeWidget(widget.id);
          }}
          className="
            absolute
            left-2
            top-2
            z-20
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-md
            border
            border-red-200
            bg-white
            text-red-500
            opacity-0
            shadow-sm
            transition-all
            duration-150
            group-hover:opacity-100
            hover:bg-red-50
            hover:text-red-600
          "
        >
          <Trash2 size={14} />
        </button>
      )}

      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );

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
        {Content}
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
      minWidth={widget.minWidth}
      minHeight={widget.minHeight}
      maxWidth={widget.maxWidth}
      maxHeight={widget.maxHeight}
      onDragStop={(e, d) => {
        updateWidget(widget.id, {
          x: d.x,
          y: d.y,
        });
      }}
      onResizeStop={(e, dir, ref, delta, position) => {
        updateWidget(widget.id, {
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
          x: position.x,
          y: position.y,
        });
      }}
      bounds="parent"
      disableDragging={!editable || widget.draggable === false}
      enableResizing={editable && widget.resizable !== false}
    >
      {Content}
    </Rnd>
  );
}
