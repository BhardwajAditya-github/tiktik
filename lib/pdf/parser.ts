import { inflate, deflate } from "pako";
import { PdfObject } from "./types";
import { parseContentStream } from "./contentParser";
import { filterColor } from "./colorFilter";
import { serializeContentStream } from "./contentSerializer";
import { rebuildPDF } from "./rebuilder";

const decoder = new TextDecoder();

const OBJ = new TextEncoder().encode("obj");
const ENDOBJ = new TextEncoder().encode("endobj");
const STREAM = new TextEncoder().encode("stream");

function parseDictionary(dictionary: string): Record<string, string> {
  const result: Record<string, string> = {};

  const body = dictionary.replace(/^<<\s*/, "").replace(/\s*>>$/, "");

  let i = 0;

  while (i < body.length) {
    while (i < body.length && /\s/.test(body[i])) i++;

    if (i >= body.length) break;

    if (body[i] !== "/") {
      i++;
      continue;
    }

    i++;

    // ---------- KEY ----------
    let key = "";

    while (i < body.length && body[i] !== "/" && !/\s/.test(body[i])) {
      key += body[i++];
    }

    while (i < body.length && /\s/.test(body[i])) i++;

    if (i >= body.length) {
      result[key] = "";
      break;
    }

    // ---------- VALUE ----------

    // Name object (/Page /Image /FlateDecode ...)
    if (body[i] === "/") {
      const start = ++i;

      while (i < body.length && body[i] !== "/" && !/\s/.test(body[i])) {
        i++;
      }

      const name = body.slice(start, i);

      // Look ahead.
      let j = i;

      while (j < body.length && /\s/.test(body[j])) j++;

      // If another '/' immediately follows, then the name we just read
      // is actually the VALUE of the current key.
      if (j >= body.length || body[j] === "/") {
        result[key] = "/" + name;
        continue;
      }

      // Otherwise continue reading normal value.
      result[key] = "/" + name;
      continue;
    }

    // Array
    if (body[i] === "[") {
      let depth = 1;

      const start = i++;

      while (i < body.length && depth > 0) {
        if (body[i] === "[") depth++;
        if (body[i] === "]") depth--;
        i++;
      }

      result[key] = body.slice(start, i);
      continue;
    }

    // Nested dictionary
    if (body[i] === "<" && body[i + 1] === "<") {
      let depth = 1;

      const start = i;

      i += 2;

      while (i < body.length && depth > 0) {
        if (body.slice(i, i + 2) === "<<") {
          depth++;
          i += 2;
          continue;
        }

        if (body.slice(i, i + 2) === ">>") {
          depth--;
          i += 2;
          continue;
        }

        i++;
      }

      result[key] = body.slice(start, i);
      continue;
    }

    // Number / bool / indirect reference
    const start = i;

    while (i < body.length && body[i] !== "/") {
      i++;
    }

    result[key] = body.slice(start, i).trim();
  }

  return result;
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength,
  ) as ArrayBuffer;
}

function resolveReference(ref: string): number | null {
  const m = ref.match(/(\d+)\s+\d+\s+R/);

  return m ? Number(m[1]) : null;
}

export async function inspectPDF(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());

  const objects = parseObjects(bytes);

  const embeddedObjects = extractObjectStreams(objects);

  objects.push(...embeddedObjects);

  const objectMap = new Map<number, PdfObject>();

  for (const obj of objects) {
    objectMap.set(obj.objectNumber, obj);
  }

  const pages = objects.filter((o) => o.dict.Type === "/Page");

  for (const page of pages) {
    const ref = resolveReference(page.dict.Contents ?? "");

    if (ref == null) continue;

    const stream = objectMap.get(ref);

    if (!stream?.stream) continue;

    if (stream.dict.Filter !== "/FlateDecode") continue;

    try {
      const inflated = inflate(stream.stream);

      const commands = decoder.decode(inflated);
      const operators = parseContentStream(commands);

      let filtered = operators;

      filtered = filterColor(filtered, [1, 0, 0]);
      filtered = filterColor(filtered, [1, 1, 0]);
      filtered = filterColor(filtered, [0, 0.502, 0]);

      const rebuilt = serializeContentStream(filtered);

      const rebuiltBytes = new TextEncoder().encode(rebuilt);

      const compressed = deflate(rebuiltBytes);

      stream.rebuiltStream = compressed;
    } catch (e) {
      console.error(e);
    }
  }

  const rebuilt = rebuildPDF(bytes, objects);

  const blob = new Blob([toArrayBuffer(rebuilt)], {
    type: "application/pdf",
  });

  return blob;
}

function parseObjects(bytes: Uint8Array): PdfObject[] {
  const objects: PdfObject[] = [];

  let i = 0;

  while (i < bytes.length) {
    const objIndex = findSequence(bytes, OBJ, i);

    if (objIndex === -1) break;

    // Find beginning of header line
    let lineStart = objIndex;

    while (
      lineStart > 0 &&
      bytes[lineStart - 1] !== 0x0a &&
      bytes[lineStart - 1] !== 0x0d
    ) {
      lineStart--;
    }

    const header = decoder
      .decode(bytes.slice(lineStart, objIndex + OBJ.length))
      .trim();

    const match = header.match(/^(\d+)\s+(\d+)\s+obj$/);

    if (!match) {
      i = objIndex + OBJ.length;
      continue;
    }

    const objectNumber = Number(match[1]);
    const generation = Number(match[2]);

    const endObj = findSequence(bytes, ENDOBJ, objIndex);

    if (endObj === -1) break;

    let dictionary = "";
    let stream: Uint8Array | undefined;

    const streamIndex = findSequence(bytes, STREAM, objIndex);

    // No stream inside this object
    if (streamIndex === -1 || streamIndex > endObj) {
      dictionary = decoder.decode(bytes.slice(objIndex + OBJ.length, endObj));
    } else {
      dictionary = decoder.decode(
        bytes.slice(objIndex + OBJ.length, streamIndex),
      );

      const lengthMatch = dictionary.match(/\/Length\s+(\d+)/);

      if (lengthMatch) {
        const length = Number(lengthMatch[1]);

        let start = streamIndex + STREAM.length;

        // Skip CR/LF after "stream"
        if (bytes[start] === 0x0d && bytes[start + 1] === 0x0a) {
          start += 2;
        } else if (bytes[start] === 0x0d || bytes[start] === 0x0a) {
          start += 1;
        }

        stream = bytes.slice(start, start + length);
      }
    }

    const dict = parseDictionary(dictionary);

    const dictionaryStart = objIndex + OBJ.length;
    let dictionaryEnd = endObj;

    let lengthStart: number | undefined;
    let lengthEnd: number | undefined;

    let streamStart: number | undefined;
    let streamEnd: number | undefined;

    if (streamIndex !== -1 && streamIndex < endObj) {
      dictionaryEnd = streamIndex;

      const lengthMatch = /\/Length\s+(\d+)/.exec(dictionary);

      if (lengthMatch) {
        const length = Number(lengthMatch[1]);

        const numberIndex =
          lengthMatch.index + lengthMatch[0].lastIndexOf(lengthMatch[1]);

        lengthStart = dictionaryStart + numberIndex;
        lengthEnd = lengthStart + lengthMatch[1].length;

        let start = streamIndex + STREAM.length;

        if (bytes[start] === 0x0d && bytes[start + 1] === 0x0a) {
          start += 2;
        } else if (bytes[start] === 0x0d || bytes[start] === 0x0a) {
          start += 1;
        }

        streamStart = start;
        streamEnd = start + length;
      }
    }

    objects.push({
      objectNumber,
      generation,

      dictionary: dictionary.trim(),
      dict,

      stream,

      rebuiltStream: undefined,

      objectStart: lineStart,
      objectEnd: endObj + ENDOBJ.length,

      dictionaryStart,
      dictionaryEnd,

      streamStart,
      streamEnd,

      lengthStart,
      lengthEnd,
    });

    i = endObj + ENDOBJ.length;
  }

  return objects;
}

function extractObjectStreams(objects: PdfObject[]): PdfObject[] {
  const extracted: PdfObject[] = [];

  for (const object of objects) {
    if (!object.stream) continue;

    if (object.dict.Type !== "/ObjStm") continue;

    if (object.dict.Filter !== "/FlateDecode") continue;

    try {
      const inflated = inflate(object.stream);

      const text = decoder.decode(inflated);

      const first = Number(object.dict.First);

      const indexText = text.substring(0, first).trim();

      const objectData = text.substring(first);

      // Parse index
      const nums = indexText.split(/\s+/);

      const entries: { id: number; offset: number }[] = [];

      for (let i = 0; i < nums.length; i += 2) {
        entries.push({
          id: Number(nums[i]),
          offset: Number(nums[i + 1]),
        });
      }

      // Extract every embedded object
      for (let i = 0; i < entries.length; i++) {
        const start = entries[i].offset;

        const end =
          i === entries.length - 1 ? objectData.length : entries[i + 1].offset;

        const objectText = objectData.substring(start, end).trim();

        const dictStart = objectText.indexOf("<<");

        if (dictStart === -1) continue;

        // Find matching >>
        let depth = 0;
        let endIndex = -1;

        for (let j = dictStart; j < objectText.length - 1; j++) {
          const two = objectText.substring(j, j + 2);

          if (two === "<<") {
            depth++;
            j++;
            continue;
          }

          if (two === ">>") {
            depth--;
            j++;

            if (depth === 0) {
              endIndex = j + 1;
              break;
            }
          }
        }

        if (endIndex === -1) continue;

        const dictionary = objectText.substring(dictStart, endIndex + 1);

        extracted.push({
          objectNumber: entries[i].id,
          generation: 0,

          dictionary,
          dict: parseDictionary(dictionary),

          stream: undefined,
          rebuiltStream: undefined,

          objectStart: -1,
          objectEnd: -1,

          dictionaryStart: -1,
          dictionaryEnd: -1,

          streamStart: undefined,
          streamEnd: undefined,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  return extracted;
}

function findSequence(bytes: Uint8Array, sequence: Uint8Array, from: number) {
  outer: for (let i = from; i <= bytes.length - sequence.length; i++) {
    for (let j = 0; j < sequence.length; j++) {
      if (bytes[i + j] !== sequence[j]) {
        continue outer;
      }
    }

    return i;
  }

  return -1;
}
