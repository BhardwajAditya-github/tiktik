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
    <div className="h-full p-4">
      <h2 className="mb-4 text-lg font-semibold">Question Paper</h2>

      <input type="file" accept="application/pdf" onChange={handleUpload} />

      {pdfFile && <p className="mt-4 text-sm text-green-600">{pdfFile.name}</p>}
    </div>
  );
}
