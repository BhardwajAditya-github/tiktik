export interface PdfOperator {
  operator: string;
  operands: string[];
}

const OPERATORS = new Set([
  "q",
  "Q",

  "cm",

  "w",
  "J",
  "j",
  "M",
  "d",

  "rg",
  "RG",
  "g",
  "G",

  "k",
  "K",

  "re",

  "m",
  "l",
  "c",
  "v",
  "y",
  "h",

  "f",
  "f*",
  "F",

  "S",
  "s",

  "B",
  "B*",
  "b",
  "b*",

  "n",

  "W",
  "W*",

  "BT",
  "ET",

  "Tf",
  "Td",
  "TD",
  "Tm",
  "Tj",
  "TJ",
  "T*",
  "Tc",
  "Tw",
  "TL",
  "Ts",
  "Tr",
  "Tz",

  "BDC",
  "EMC",

  "Do",
]);

export function parseContentStream(stream: string): PdfOperator[] {
  const operators: PdfOperator[] = [];

  const tokens = stream.match(/\[[^\]]*]|<<[\s\S]*?>>|\([^\)]*\)|\/?[^\s]+/g);

  if (!tokens) return operators;

  let operands: string[] = [];

  for (const token of tokens) {
    if (OPERATORS.has(token)) {
      operators.push({
        operator: token,
        operands,
      });

      operands = [];
    } else {
      operands.push(token);
    }
  }

  return operators;
}
