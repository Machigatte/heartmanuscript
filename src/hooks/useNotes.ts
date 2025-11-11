import { useQuery } from "@tanstack/react-query";
import client from "@/api/client";
import { NoteSummary } from "@/models/NoteSummary";

export function useNotes() {
  return useQuery<NoteSummary[]>({
    queryKey: ['notes'],
    queryFn: () => client.getAllNotes(),
    refetchInterval: 1000 * 30,
    retry: 3, 
  });
}
