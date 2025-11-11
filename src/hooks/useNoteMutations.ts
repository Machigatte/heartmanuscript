import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '@/api/client';
import { NotePayload } from '@/api/types';
import { NoteDetail } from '@/models/NoteDetail';
import { toast } from 'sonner';

// -----------------------------------------------------
// 1. CREATE NOTE
// -----------------------------------------------------

/**
 * 创建新笔记的 Mutation Hook
 */
export function useCreateNote(options?: { onSuccess: (newNote: NoteDetail) => void; }) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: NotePayload) => client.createNote(data),
    
    // 成功回调：创建成功后，刷新笔记列表
    onSuccess: (newNote) => {
      // 强制刷新笔记列表 ['notes']，以显示新创建的笔记
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      
      queryClient.setQueryData(['note', newNote.id], newNote);

      toast.success("保存成功");

      options?.onSuccess(newNote);
    },
    onError: () => {
      toast.error("保存时发生错误");
    }
  });
}

// -----------------------------------------------------
// 2. UPDATE NOTE
// -----------------------------------------------------

/**
 * 更新现有笔记内容的 Mutation Hook
 */
export function useUpdateNote() {
  const queryClient = useQueryClient();

  // 这里的 data 包含 id 和完整的 NotePayload
  interface UpdateNoteVariables {
      id: number;
      data: NotePayload;
  }
  
  return useMutation({
    mutationFn: ({ id, data }: UpdateNoteVariables) => client.updateNote(id, data),
    
    // 成功回调：更新成功后，刷新单个笔记的缓存和列表缓存
    onSuccess: (updatedNote) => {
      // 刷新单个笔记的缓存 (如在 Editor 中使用的 ['note', id])
      queryClient.invalidateQueries({ queryKey: ['note', updatedNote.id] });
      // 刷新笔记列表的缓存 ['notes']，以更新列表中的摘要/标题
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success("保存成功");
    },
    onError: () => {
      toast.error("保存时发生错误");
    }
  });
}

// -----------------------------------------------------
// 3. DELETE NOTE
// -----------------------------------------------------

/**
 * 删除笔记的 Mutation Hook
 */
export function useDeleteNote() {
  const queryClient = useQueryClient();
  
  return useMutation({
    // 异步函数：接收笔记 ID，调用 client.deleteNote
    mutationFn: (id: number) => client.deleteNote(id),
    
    // 成功回调：删除成功后，刷新笔记列表
    onSuccess: (data, id) => {
      // 强制刷新笔记列表 ['notes']
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      // 选择性地从缓存中移除已删除的单个笔记数据
      queryClient.removeQueries({ queryKey: ['note', id] });
      toast.success("笔记已删除");
    },

    onError: () => {
      toast.error("删除时发生错误");
    }
  });
}

// -----------------------------------------------------
// 4. ARCHIVE NOTE
// -----------------------------------------------------

/**
 * 归档笔记的 Mutation Hook
 */
export function useArchiveNote() {
  const queryClient = useQueryClient();
  
  return useMutation({
    // 异步函数：接收笔记 ID，调用 client.archiveNote
    mutationFn: (id: number) => client.archiveNote(id),
    
    // 成功回调：归档成功后，刷新单个笔记和列表
    onSuccess: (updatedNote) => {
      // 刷新单个笔记，使其状态在 Editor 中更新
      queryClient.invalidateQueries({ queryKey: ['note', updatedNote.id] });
      toast.success("归档成功");
    },
    onError: () => {
      toast.error("归档时发生错误");
    }
  });
}

// -----------------------------------------------------
// 5. SUMMARIZE NOTE
// -----------------------------------------------------

/**
 * 请求笔记摘要的 Mutation Hook (AI 操作)
 */
export function useSummarizeNote() {
  const queryClient = useQueryClient();
  
  return useMutation({
    // 异步函数：接收笔记 ID，调用 client.summarizeNote
    mutationFn: (id: number) => client.summarizeNote(id),
    
    // 成功回调：摘要成功后，刷新单个笔记（以显示摘要结果）
    onSuccess: (updatedNote) => {
      // 刷新单个笔记，以在 Editor 中显示新的摘要内容
      queryClient.invalidateQueries({ queryKey: ['note', updatedNote.id] });
      toast.success("已生成总结");
    },
    onError: () => {
      toast.error("生成总结时发生错误");
    }
  });
}