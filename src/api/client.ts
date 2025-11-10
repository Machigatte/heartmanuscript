import api from '@/api/api';
import { NoteDetail } from '@/models/NoteDetail';
import { NoteSummary } from '@/models/NoteSummary';
import { NotePayload, NoteType } from './types';
import { plainToInstance } from 'class-transformer';

const client = {
  getCurrentUser: async () => {
    const res = await api.get('/me');
    return res.data;
  },
  getNoteById: async (id: number): Promise<NoteDetail> => {
    const res = await api.get(`/notes/${id}`);
    return plainToInstance(NoteDetail, res.data);
  },
  getAllNotes: async (): Promise<NoteSummary[]> => {
    const res = await api.get('/notes');
    return plainToInstance(NoteSummary, res.data as unknown[]);
  },
  createNote: async (data: NotePayload): Promise<NoteDetail> => {
    const res = await api.post('/notes', data);
    return plainToInstance(NoteDetail, res.data);
  },
  updateNote: async (id: number, data: NotePayload): Promise<NoteDetail> => {
    const res = await api.put(`/notes/${id}`, data);
    return plainToInstance(NoteDetail, res.data);
  },
  deleteNote: async (id: number): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },
  archiveNote: async (id: number): Promise<NoteDetail> => {
    const res = await api.put(`/notes/${id}/archive`);
    return plainToInstance(NoteDetail, res.data);
  },
  summarizeNote: async (id: number): Promise<NoteDetail> => {
    const res = await api.put(`/notes/${id}/summarize`);
    return plainToInstance(NoteDetail, res.data);
  },
  searchNotes: async (params: {
    from?: Date;
    to?: Date;
    type?: NoteType;
    keyword?: string;
  }): Promise<NoteSummary[]> => {
    const res = await api.get('/notes/search', { params });
    return plainToInstance(NoteSummary, res.data as unknown[]);
  }
}

export default client;
