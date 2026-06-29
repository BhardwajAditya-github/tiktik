import { PdfOperator } from "./contentParser";

export function serializeContentStream(operators: PdfOperator[]): string {
  return operators
    .map((op) => {
      if (op.operands.length === 0) {
        return op.operator;
      }

      return `${op.operands.join(" ")} ${op.operator}`;
    })
    .join("\n");
}
