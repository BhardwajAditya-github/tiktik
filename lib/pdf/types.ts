export interface PdfObject {
  objectNumber: number;
  generation: number;

  dictionary: string;
  dict: Record<string, string>;

  stream?: Uint8Array;

  rebuiltStream?: Uint8Array;

  objectStart: number;
  objectEnd: number;

  dictionaryStart: number;
  dictionaryEnd: number;

  streamStart?: number;
  streamEnd?: number;

  lengthStart?: number;
  lengthEnd?: number;
}
