"use client";

import { useMemo, useState } from "react";
import { Settings } from "lucide-react";

import WidgetWrapper from "../WidgetWrapper";
import type { Widget } from "../widget";

import QuestionRow from "./QuestionRow";
import AnswerSheetSettings from "./AnswerSheetSettings";

import { DEFAULT_ANSWER_SHEET_CONFIG, type AnswerSheetConfig } from "./types";

export default function AnswerSheetWidget({
  widget,
  editable,
}: {
  widget: Widget;
  editable: boolean;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Temporary local config
  // Later this should come from widget.config
  const config: AnswerSheetConfig = {
    ...DEFAULT_ANSWER_SHEET_CONFIG,
    ...(widget.config as Partial<AnswerSheetConfig>),
  };

  // Temporary local answers
  // Later move this into Zustand
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const answeredCount = useMemo(() => {
    return Object.values(answers).filter((x) => x !== "").length;
  }, [answers]);

  return (
    <>
      <WidgetWrapper widget={widget} editable={editable}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Answer Sheet
              </h2>

              <p className="text-xs text-slate-500">
                {answeredCount} / {config.questionCount} Answered
              </p>
            </div>

            {editable && (
              <button
                onClick={() => setSettingsOpen(true)}
                className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <Settings size={15} />
              </button>
            )}
          </div>

          {/* Questions */}
          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {Array.from({ length: config.questionCount }, (_, index) => {
              const question = index + 1;

              return (
                <QuestionRow
                  key={question}
                  questionNumber={question}
                  answerType={config.answerType}
                  options={config.options}
                  value={answers[question] ?? ""}
                  onChange={(value) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [question]: value,
                    }))
                  }
                />
              );
            })}
          </div>
        </div>
      </WidgetWrapper>

      {settingsOpen && (
        <AnswerSheetSettings
          widget={widget}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </>
  );
}
