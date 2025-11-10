import { useQuery } from "@tanstack/react-query";
import authService from "@/api/auth";

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => authService.getUser(),
  });
}
