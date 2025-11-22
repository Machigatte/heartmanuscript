import { useQuery } from "@tanstack/react-query";
import client from "@/api/client";
import { Note, SearchParams } from "@/types";
import { NoteMapper } from "@/mappers/note-mapper";

export function useSearchNotes(params?: SearchParams) {
  return useQuery<Note[]>({
    queryKey: ['search-notes', JSON.stringify(params)],
    queryFn: async () => {
      const responses = await client.getNotes(params);
      return NoteMapper.mapNoteListResponseToNotes(responses);
    }
  });
}
