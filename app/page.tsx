"use client";

import Canvas from "@/modules/canvas/Canvas";
import LeftSidebar from "@/modules/builder/LeftSidebar";
import RightSidebar from "@/modules/builder/RightSidebar";
import PreviewModal from "@/modules/preview/PreviewModal";
import { useExamStore } from "@/store/examStore";
import ExamOverlay from "@/modules/exam/ExamOverlay";
import { Play, Eye } from "lucide-react";

export default function BuilderPage() {
  const setPreviewOpen = useExamStore((s) => s.setPreviewOpen);
  const startExam = useExamStore((s) => s.startExam);

  return (
    <div className="flex h-screen flex-col bg-slate-100">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            T
          </div>

          <div>
            <h1 className="text-base font-semibold text-slate-800">TickTick</h1>

            <p className="text-xs text-slate-500">Mock Test Builder</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewOpen(true)}
            className="
              flex items-center gap-2
              rounded-lg border border-slate-200
              bg-white
              px-3 py-2
              text-sm font-medium text-slate-700
              transition
              hover:bg-slate-50
            "
          >
            <Eye size={16} />
            Preview
          </button>

          <button
            onClick={startExam}
            className="
              flex items-center gap-2
              rounded-lg
              bg-blue-600
              px-4 py-2
              text-sm font-medium text-white
              transition
              hover:bg-blue-700
            "
          >
            <Play size={16} />
            Start Exam
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-72 border-r border-slate-200 bg-slate-50">
          <LeftSidebar />
        </aside>

        {/* Canvas */}
        <main className="flex-1 overflow-auto bg-slate-100 p-8">
          <Canvas editable />
        </main>

        <PreviewModal />
        <ExamOverlay />

        {/* Right Sidebar */}
        <aside className="w-80 border-l border-slate-200 bg-slate-50">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
}
