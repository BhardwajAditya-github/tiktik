"use client";

import { useState } from "react";

import WidgetWrapper from "../WidgetWrapper";
import type { Widget } from "../widget";

import { usePDFStore } from "@/store/pdfStore";
import { inspectPDF } from "@/lib/pdf/parser";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";

import dynamic from "next/dynamic";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { FileText, Settings } from "lucide-react";
import { useEffect } from "react";

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
  const pdfFile = usePDFStore((s) => s.pdfFile);
  const setPDFBlob = usePDFStore((s) => s.setPDFBlob);

  const zoomPluginInstance = zoomPlugin();

  const { ZoomIn, ZoomOut, CurrentScale } = zoomPluginInstance;

  const [settingsOpen, setSettingsOpen] = useState(false);

  const removeAnswers = usePDFStore((s) => s.removeAnswers);
  const setRemoveAnswers = usePDFStore((s) => s.setRemoveAnswers);

  useEffect(() => {
    if (!pdfFile) return;

    if (!removeAnswers) {
      usePDFStore.setState({
        pdfUrl: URL.createObjectURL(pdfFile),
      });

      return;
    }

    (async () => {
      const blob = await inspectPDF(pdfFile);

      if (blob) {
        setPDFBlob(blob);
      }
    })();
  }, [pdfFile, removeAnswers]);

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

              <button
                onClick={() => setSettingsOpen(true)}
                className="rounded-md p-2 hover:bg-slate-200"
              >
                <Settings size={18} />
              </button>
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
      {settingsOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-80 rounded-xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">PDF Settings</h2>

              <button
                onClick={() => setSettingsOpen(false)}
                className="text-xl"
              >
                ×
              </button>
            </div>

            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm">Remove Answer Highlights</span>

              <input
                type="checkbox"
                checked={removeAnswers}
                onChange={(e) => setRemoveAnswers(e.target.checked)}
              />
            </label>
          </div>
        </div>
      )}
    </WidgetWrapper>
  );
}
