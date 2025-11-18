import { CreateNoteRequest, NoteDetailResponse, NoteSummaryResponse, UpdateNoteRequest } from "@/types";
import { Note } from "@/types/domain/note";
import { parseISO } from "date-fns";

export class NoteMapper {
  static mapNoteToCreateRequest(note: Note): CreateNoteRequest {
    return {
      title: note.title,
      type: note.type,
      head: note.head ?? "",
      body: note.body ?? "",
      tail: note.tail ?? "",
      summary: note.summary ?? "",
    };
  }

  static mapNoteToUpdateRequest(note: Note): UpdateNoteRequest {
    return {
      title: note.title,
      type: note.type,
      head: note.head ?? "",
      body: note.body ?? "",
      tail: note.tail ?? "",
      summary: note.summary ?? "",
    };
  }

  static mapNoteDetailResponseToNote(response: NoteDetailResponse): Note {
    return {
      id: response.id,
      title: response.title,
      type: response.type,

      head: response.head,
      body: response.body,
      tail: response.tail,
      summary: response.summary,

      createdAt: parseISO(response.created_at),
      updatedAt: parseISO(response.updated_at),
      archivedAt: response.archived_at ? parseISO(response.archived_at) : null,
    };
  }

  static mapNoteSummaryResponseToNote(response: NoteSummaryResponse): Note {
    return {
      id: response.id,
      title: response.title,
      type: response.type,

      createdAt: parseISO(response.created_at),
      updatedAt: parseISO(response.updated_at),
      archivedAt: response.archived_at ? parseISO(response.archived_at) : null,
    }
  }

  static mapNoteListResponseToNotes(responses: NoteSummaryResponse[]): Note[] {
    return responses.map(r => this.mapNoteSummaryResponseToNote(r));
  }
}
