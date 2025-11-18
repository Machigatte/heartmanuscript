import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import client from '@/api/client';
import { Note } from '@/types';
import { NoteMapper } from '@/mappers/note-mapper';

// 创建笔记
export function useCreateNote(
  options?: UseMutationOptions<Note, unknown, Note>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (note: Note) => {
      const payload = NoteMapper.mapNoteToCreateRequest(note);
      const response = await client.createNote(payload);
      return NoteMapper.mapNoteDetailResponseToNote(response);
    },
    onSuccess: (...args) => {
      // 创建后刷新 notes 列表
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
}

// 更新笔记
export function useUpdateNote(
  options?: UseMutationOptions<Note, unknown, Note>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (note: Note) => {
      const payload = NoteMapper.mapNoteToUpdateRequest(note);
      const response = await client.updateNote(note.id, payload);
      return NoteMapper.mapNoteDetailResponseToNote(response);
    },
    onSuccess: (...args) => {
      const [data] = args;
      // 更新后刷新该 note
      queryClient.invalidateQueries({ queryKey: ['note', data.id.toString()] });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
}

// 删除笔记
export function useDeleteNote(
  options?: UseMutationOptions<void, unknown, Note>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (note: Note) => {
      await client.deleteNote(note.id);
    },
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
}

// 存档笔记
export function useArchiveNote(
  options?: UseMutationOptions<Note, unknown, Note>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (note: Note) => {
      const response = await client.archiveNote(note.id);
      return NoteMapper.mapNoteDetailResponseToNote(response);
    },
    onSuccess: (...args) => {
      const [data] = args;
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['note', data.id.toString()] });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
}

// 总结笔记
export function useSummarizeNote(
  options?: UseMutationOptions<Note, unknown, Note>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (note: Note) => {
      const response = await client.summarizeNote(note.id);
      return NoteMapper.mapNoteDetailResponseToNote(response);
    },
    onSuccess: (...args) => {
      const [data] = args;
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['note', data.id.toString()] });
      options?.onSuccess?.(...args);
    },
    ...options,
  });
}
