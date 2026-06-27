"use client";

import Canvas from "@/modules/canvas/Canvas";
import LeftSidebar from "@/modules/builder/LeftSidebar";
import RightSidebar from "@/modules/builder/RightSidebar";
import PreviewModal from "@/modules/preview/PreviewModal";
import ExamOverlay from "@/modules/exam/ExamOverlay";

import { useExamStore } from "@/store/examStore";
import { Play, Eye } from "lucide-react";

export default function BuilderPage() {
  const setPreviewOpen = useExamStore((s) => s.setPreviewOpen);
  const startExam = useExamStore((s) => s.startExam);

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            T
          </div>

          <div>
            <h1 className="text-sm font-semibold text-slate-800 sm:text-base">
              TickTick
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              Mock Test Builder
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Eye size={16} />
            <span className="hidden sm:inline">Preview</span>
          </button>

          <button
            onClick={startExam}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 sm:px-4"
          >
            <Play size={16} />
            <span className="hidden sm:inline">Start Exam</span>
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar */}
        <aside className="h-56 shrink-0 border-b border-slate-200 bg-slate-50 lg:h-auto lg:w-72 lg:border-b-0 lg:border-r">
          <LeftSidebar />
        </aside>

        {/* Canvas */}
        <main className="flex-1 overflow-auto bg-slate-100 p-3 sm:p-5 lg:p-8">
          <Canvas editable />
        </main>

        {/* Right Sidebar */}
        <aside className="h-64 shrink-0 border-t border-slate-200 bg-slate-50 lg:h-auto lg:w-80 lg:border-t-0 lg:border-l">
          <RightSidebar />
        </aside>

        <PreviewModal />
        <ExamOverlay />
      </div>
    </div>
  );
}
