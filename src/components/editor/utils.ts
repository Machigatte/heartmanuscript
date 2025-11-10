import { NoteDetail } from "@/models/NoteDetail";

export function isNoteArchived(note: NoteDetail): boolean {
    return !!note.archivedAt;
}
