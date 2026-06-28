export type AnswerType = "mcq" | "text";

export interface AnswerSheetConfig {
  questionCount: number;

  answerType: AnswerType;

  options: string[];

  answers: Record<number, string>;
}

export const DEFAULT_ANSWER_SHEET_CONFIG: AnswerSheetConfig = {
  questionCount: 100,
  answerType: "mcq",
  options: ["A", "B", "C", "D"],
  answers: {},
};
