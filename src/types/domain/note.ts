import "reflect-metadata";
import { NoteType } from '@/types';

export type Note = {
  id: bigint
  title: string
  type: NoteType

  // 以下 4 项仅在 NoteDetail / 草稿 / 编辑器中才有意义
  head?: string
  body?: string
  tail?: string
  summary?: string

  createdAt: Date
  updatedAt: Date
  archivedAt: Date | null
}
