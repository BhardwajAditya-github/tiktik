"use client";

import WidgetWrapper from "../WidgetWrapper";
import type { Widget } from "../widget";

import { usePDFStore } from "@/store/pdfStore";

import "@react-pdf-viewer/core/lib/styles/index.css";
import dynamic from "next/dynamic";

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

export default function PDFWidget({ widget, editable }: { widget: Widget; editable: boolean }) {
  const pdfUrl = usePDFStore((state) => state.pdfUrl);

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
              <Viewer fileUrl={pdfUrl} />
            </Worker>
          </div>
        )}
      </div>
    </WidgetWrapper>
  );
}
