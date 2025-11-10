import { NoteTypeMap } from "@/constants/note";
import { NoteDetail } from "@/models/NoteDetail";

export type NoteType = keyof typeof NoteTypeMap;

export interface NotePayload {
  title: string;
  type: NoteType;
  head: string;
  body: string;
  tail: string;
  summary: string;
}

export interface SearchNotesParams {
  from?: Date;
  to?: Date;
  type?: NoteType;
  keyword?: string;
}

export const toNotePayload = (noteDetail: NoteDetail): NotePayload => {
  const { title, type, head, body, tail, summary } = noteDetail;
  return { title, type, head, body, tail, summary };
};
