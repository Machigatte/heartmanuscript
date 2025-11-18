import { useQuery } from "@tanstack/react-query";
import client from "@/api/client";
import { Note } from "@/types";
import { NoteMapper } from "@/mappers/note-mapper";

export function useNotes() {
  return useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: async () => {
      const responses = await client.getNotes();
      return NoteMapper.mapNoteListResponseToNotes(responses);
    },
    refetchInterval: 1000 * 30,
    retry: 3, 
  });
}
