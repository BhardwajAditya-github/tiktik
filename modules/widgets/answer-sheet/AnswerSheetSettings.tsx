"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { useWidgetStore } from "@/store/widgetStore";

import { Widget } from "../widget";
import {
  AnswerType,
  AnswerSheetConfig,
  DEFAULT_ANSWER_SHEET_CONFIG,
} from "./types";

interface Props {
  widget: Widget;
  onClose: () => void;
}

export default function AnswerSheetSettings({ widget, onClose }: Props) {
  const updateWidget = useWidgetStore((s) => s.updateWidget);

  const config: AnswerSheetConfig = {
    ...DEFAULT_ANSWER_SHEET_CONFIG,
    ...(widget.config as Partial<AnswerSheetConfig>),
  };

  const [questionCount, setQuestionCount] = useState(config.questionCount);

  const [answerType, setAnswerType] = useState<AnswerType>(config.answerType);

  const [options, setOptions] = useState(config.options.join(", "));

  function handleSave() {
    const parsedOptions = options
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);

    updateWidget(widget.id, {
      config: {
        questionCount,
        answerType,
        options: parsedOptions,
      },
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Answer Sheet Settings
          </h2>

          <button
            onClick={onClose}
            className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Number of Questions
            </label>

            <input
              type="number"
              min={1}
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Answer Type
            </label>

            <select
              value={answerType}
              onChange={(e) => setAnswerType(e.target.value as AnswerType)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500"
            >
              <option value="mcq">Multiple Choice</option>
              <option value="text">Text</option>
            </select>
          </div>

          {answerType === "mcq" && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Options
              </label>

              <input
                type="text"
                value={options}
                onChange={(e) => setOptions(e.target.value)}
                placeholder="A, B, C, D"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500"
              />

              <p className="mt-2 text-xs text-slate-500">
                Enter comma separated values.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-slate-200 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
