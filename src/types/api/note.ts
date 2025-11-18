import { z } from 'zod';

export const NoteTypeSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
]);

export type NoteType = z.infer<typeof NoteTypeSchema>;

export const NoteSummarySchema = z.object({
    id: z.int64(),
    title: z.string().max(255),
    type: NoteTypeSchema,
    archived_at: z.iso.datetime().nullable(),
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime(),
})

export const NoteDetailSchema = NoteSummarySchema.extend({
  head: z.string(),
  body: z.string(),
  tail: z.string(),
  summary: z.string(),
});

const BaseNoteSchema = z.object({
  title: z.string().max(255),
  type: NoteTypeSchema,
  head: z.string(),
  body: z.string(),
  tail: z.string(),
  summary: z.string(),
});

export const CreateNoteSchema = BaseNoteSchema;
export const UpdateNoteSchema = BaseNoteSchema;

export type NoteSummaryResponse = z.infer<typeof NoteSummarySchema>;
export type NoteDetailResponse = z.infer<typeof NoteDetailSchema>;
export type CreateNoteRequest = z.infer<typeof CreateNoteSchema>;
export type UpdateNoteRequest = z.infer<typeof UpdateNoteSchema>;
