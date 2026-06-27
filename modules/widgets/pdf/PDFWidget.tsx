"use client";

import WidgetWrapper from "../WidgetWrapper";
import type { Widget } from "../widget";

import { usePDFStore } from "@/store/pdfStore";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

import dynamic from "next/dynamic";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { FileText } from "lucide-react";

const Viewer = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Viewer),
  { ssr: false },
);

const Worker = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Worker),
  { ssr: false },
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
      {!pdfUrl ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-slate-50 text-center">
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <FileText size={28} className="text-slate-400" />
          </div>

          <div>
            <p className="text-sm font-medium text-slate-700">No PDF Loaded</p>

            <p className="mt-1 text-xs text-slate-500">
              Upload a PDF from the left sidebar
            </p>
          </div>
        </div>
      ) : (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div className="flex h-full flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="flex h-11 items-center justify-between border-b border-slate-200 bg-slate-50 px-3">
              <div className="flex items-center gap-2">
                <ZoomOut />

                <div className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs">
                  <CurrentScale />
                </div>

                <ZoomIn />
              </div>
            </div>

            {/* PDF */}
            <div
              className="bg-slate-300"
              style={{
                height: "calc(100% - 44px)",
              }}
            >
              <Viewer fileUrl={pdfUrl} plugins={[zoomPluginInstance]} />
            </div>
          </div>
        </Worker>
      )}
    </WidgetWrapper>
  );
}
