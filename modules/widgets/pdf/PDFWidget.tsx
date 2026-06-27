"use client";

import WidgetWrapper from "../WidgetWrapper";
import type { Widget } from "../widget";

import { usePDFStore } from "@/store/pdfStore";

import "@react-pdf-viewer/core/lib/styles/index.css";
import dynamic from "next/dynamic";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

const Viewer = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Viewer),
  {
    ssr: false,
  },
);

const Worker = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Worker),
  {
    ssr: false,
  },
);

export default function PDFWidget({
  widget,
  editable,
}: {
  widget: Widget;
  editable: boolean;
}) {
  const pdfUrl = usePDFStore((state) => state.pdfUrl);
  const zoomPluginInstance = zoomPlugin();

  const { ZoomIn, ZoomOut, CurrentScale } = zoomPluginInstance;

  return (
    <WidgetWrapper widget={widget} editable={editable}>
      <div className="h-full overflow-hidden">
        {!pdfUrl ? (
          <div className="flex h-full items-center justify-center text-slate-400">
            Upload a PDF from the left sidebar
          </div>
        ) : (
          <div className="h-full w-full">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <div className="flex h-10 items-center gap-2 border-b px-2">
                <ZoomOut />

                <CurrentScale />

                <ZoomIn />
              </div>
              <Viewer fileUrl={pdfUrl} plugins={[zoomPluginInstance]} />
            </Worker>
          </div>
        )}
      </div>
    </WidgetWrapper>
  );
}
