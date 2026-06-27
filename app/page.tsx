"use client";

import Canvas from "@/modules/canvas/Canvas";
import LeftSidebar from "@/modules/builder/LeftSidebar";
import RightSidebar from "@/modules/builder/RightSidebar";
import PreviewModal from "@/modules/preview/PreviewModal";
import { useExamStore } from "@/store/examStore";
import ExamOverlay from "@/modules/exam/ExamOverlay";
import { useCanvasStore } from "@/store/canvasStore";

export default function BuilderPage() {
  const setPreviewOpen = useExamStore((s) => s.setPreviewOpen);
  const startExam = useExamStore((s) => s.startExam);

  const zoom = useCanvasStore((s) => s.zoom);

  const zoomIn = useCanvasStore((s) => s.zoomIn);

  const zoomOut = useCanvasStore((s) => s.zoomOut);

  const resetZoom = useCanvasStore((s) => s.resetZoom);
  return (
    <div className="h-screen flex flex-col bg-slate-100">
      {/* Top Bar */}
      <header className="h-14 border-b bg-white flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">TickTick</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreviewOpen(true)}
            className="rounded-lg border px-4 py-2 hover:bg-slate-100"
          >
            Preview
          </button>

          <button
            onClick={startExam}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Start Exam
          </button>
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-72 border-r bg-white">
          <LeftSidebar />
        </aside>

        {/* Canvas */}
        <main className="flex-1 bg-slate-200 p-6 overflow-auto">
          <Canvas editable={true} />
        </main>

        <PreviewModal />
        <ExamOverlay />

        {/* Right Sidebar */}
        <aside className="w-80 border-l bg-white">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
}
