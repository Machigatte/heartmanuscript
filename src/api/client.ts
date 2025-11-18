import api from '@/api/api';
import { CreateNoteRequest, NoteDetailResponse, NoteSummaryResponse, NoteType, UpdateNoteRequest } from '@/types';

const client = {
  getNoteById: async (id: bigint): Promise<NoteDetailResponse> => {
    const res = await api.get(`/notes/${id}`);
    return res.data;
  },
  getNotes: async (params? :{
    from?: Date;
    to?: Date;
    type?: NoteType;
    keyword?: string;
  }): Promise<NoteSummaryResponse[]> => {
    const res = await api.get('/notes/search', { params });
    return res.data;
  },
  createNote: async (data: CreateNoteRequest): Promise<NoteDetailResponse> => {
    const res = await api.post('/notes', data);
    return res.data;
  },
  updateNote: async (id: bigint, data: UpdateNoteRequest): Promise<NoteDetailResponse> => {
    const res = await api.put(`/notes/${id}`, data);
    return res.data;
  },
  deleteNote: async (id: bigint): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },
  archiveNote: async (id: bigint): Promise<NoteDetailResponse> => {
    const res = await api.put(`/notes/${id}/archive`);
    return res.data;
  },
  summarizeNote: async (id: bigint): Promise<NoteDetailResponse> => {
    const res = await api.put(`/notes/${id}/summarize`);
    return res.data;
  },
}

export default client;
