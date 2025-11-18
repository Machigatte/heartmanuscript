import { useQuery } from "@tanstack/react-query";
import client from "@/api/client";
import { Note } from "@/types";
import { NoteMapper } from "@/mappers/note-mapper";
import { DRAFT_NOTE } from "@/constants/note";

export function useNote(id: bigint | null) {
  return useQuery<Note>({
    queryKey: ['note', id?.toString()],
    queryFn: async () => {
      if (id === null) {
        return DRAFT_NOTE;
      } else {
        const response = await client.getNoteById(id);
        return NoteMapper.mapNoteDetailResponseToNote(response);
      }
    }
  });
}
