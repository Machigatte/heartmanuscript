import { useQuery } from "@tanstack/react-query";
import client from "@/api/client";
import { NoteDetail } from "@/models/NoteDetail";
import { DRAFT_ID } from "@/constants/note";

export function useNote(noteId: number | null) {
  const isDraft = noteId === DRAFT_ID;

  return useQuery<NoteDetail>({
    queryKey: ['note', noteId],
    queryFn: () => {
      if (noteId === null) {
        return Promise.reject(new Error("Note ID is null"));
      }
      return client.getNoteById(noteId);
    },
    enabled: !isDraft,
  });
}
