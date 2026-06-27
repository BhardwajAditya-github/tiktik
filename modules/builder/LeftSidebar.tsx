"use client";

import { usePDFStore } from "@/store/pdfStore";

export default function LeftSidebar() {
  const setPDF = usePDFStore((state) => state.setPDF);
  const pdfFile = usePDFStore((state) => state.pdfFile);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF.");
      return;
    }

    setPDF(file);
  }

  return (
    <div className="h-full border-r bg-slate-50 p-6">
      <h2 className="text-xl font-bold text-slate-800">Question Paper</h2>

      <p className="mt-1 text-sm text-slate-500">
        Upload a PDF to begin solving.
      </p>

      <div className="mt-6 rounded-xl border-2 border-dashed border-slate-300 bg-white p-5 transition hover:border-blue-400">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleUpload}
          className="block w-full text-sm
            file:mr-4
            file:rounded-lg
            file:border-0
            file:bg-blue-600
            file:px-4
            file:py-2
            file:text-sm
            file:font-medium
            file:text-white
            hover:file:bg-blue-700
            cursor-pointer"
        />

        <p className="mt-3 text-xs text-slate-400">Supported format: PDF</p>
      </div>

      {pdfFile && (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-green-700">
            Uploaded File
          </p>

          <p className="mt-1 truncate text-sm font-medium text-green-900">
            {pdfFile.name}
          </p>
        </div>
      )}
    </div>
  );
}
