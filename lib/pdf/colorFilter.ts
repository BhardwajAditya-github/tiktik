import { PdfOperator } from "./contentParser";

const EPSILON = 0.02;

function sameColor(a: number[], b: number[]) {
  return (
    Math.abs(a[0] - b[0]) < EPSILON &&
    Math.abs(a[1] - b[1]) < EPSILON &&
    Math.abs(a[2] - b[2]) < EPSILON
  );
}

export function filterColor(
  operators: PdfOperator[],
  target: [number, number, number],
) {
  const result: PdfOperator[] = [];

  let removing = false;
  let emcDepth = 0;

  for (let i = 0; i < operators.length; i++) {
    const op = operators[i];

    // Start removing when target color is encountered
    if (!removing && op.operator === "rg") {
      const color = op.operands.map(Number);

      if (sameColor(color, target)) {
        removing = true;
        continue; // remove rg
      }
    }

    if (removing) {
      // If another color starts, stop removing
      if (op.operator === "rg") {
        const color = op.operands.map(Number);

        if (!sameColor(color, target)) {
          removing = false;
          result.push(op);
          continue;
        }

        continue;
      }

      // Track nested BDC/EMC
      if (op.operator === "BDC") {
        emcDepth++;
        continue;
      }

      if (op.operator === "EMC") {
        if (emcDepth > 0) {
          emcDepth--;
          continue;
        }
      }

      // Remove ALL drawing/path/clip operators
      if (
        [
          "re",
          "f",
          "f*",
          "B",
          "B*",
          "b",
          "b*",
          "W",
          "W*",
          "n",
          "q",
          "Q",
          "cm",
          "m",
          "l",
          "h",
          "S",
          "s",
        ].includes(op.operator)
      ) {
        continue;
      }

      // Remove empty marked-content blocks too
      if (emcDepth > 0) {
        continue;
      }
    }

    result.push(op);
  }

  return result;
}
