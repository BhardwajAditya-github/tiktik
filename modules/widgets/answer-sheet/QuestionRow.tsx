"use client";

import { AnswerType } from "./types";

interface Props {
  questionNumber: number;
  answerType: AnswerType;

  options: string[];

  value: string;

  onChange: (value: string) => void;
}

export default function QuestionRow({
  questionNumber,
  answerType,
  options,
  value,
  onChange,
}: Props) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3">
      {/* Question Number */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-sm font-semibold text-slate-700">
        {questionNumber}
      </div>

      {/* Answer */}
      <div className="flex-1">
        {answerType === "mcq" ? (
          <div className="flex flex-wrap gap-2">
            {options.map((option) => {
              const selected = value === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onChange(selected ? "" : option)}
                  className={`flex h-8 min-w-8 items-center justify-center rounded-md border px-3 text-sm font-medium transition ${
                    selected
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Answer"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        )}
      </div>
    </div>
  );
}
