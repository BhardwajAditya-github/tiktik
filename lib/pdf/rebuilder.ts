import { PdfObject } from "./types";

interface Patch {
  start: number;
  end: number;
  data: Uint8Array;
}

const encoder = new TextEncoder();

export function rebuildPDF(
  original: Uint8Array,
  objects: PdfObject[],
): Uint8Array {
  const patches: Patch[] = [];

  for (const object of objects) {
    if (!object.rebuiltStream) continue;

    if (object.streamStart === undefined || object.streamEnd === undefined) {
      continue;
    }

    // -----------------------------
    // Stream replacement
    // -----------------------------
    patches.push({
      start: object.streamStart,
      end: object.streamEnd,
      data: object.rebuiltStream,
    });

    // -----------------------------
    // Length replacement
    // -----------------------------
    if (object.lengthStart !== undefined && object.lengthEnd !== undefined) {
      patches.push({
        start: object.lengthStart,
        end: object.lengthEnd,
        data: encoder.encode(object.rebuiltStream.length.toString()),
      });
    }
  }

  if (patches.length === 0) {
    return original;
  }

  // Apply from end of file backwards so offsets never change.
  patches.sort((a, b) => b.start - a.start);

  let current = original;

  for (const patch of patches) {
    const before = current.slice(0, patch.start);

    const after = current.slice(patch.end);

    const output = new Uint8Array(
      before.length + patch.data.length + after.length,
    );

    output.set(before, 0);

    output.set(patch.data, before.length);

    output.set(after, before.length + patch.data.length);

    current = output;
  }

  return current;
}
