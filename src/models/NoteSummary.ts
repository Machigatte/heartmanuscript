import "reflect-metadata";
import { NoteType } from '@/api/types';
import { Type } from 'class-transformer';

export class NoteSummary {
  id: number = 0;
  title: string = "";
  type: NoteType = 1 as NoteType;

  @Type(() => Date)
  archivedAt: Date | null = null;
  @Type(() => Date)
  createdAt: Date = new Date();
  @Type(() => Date)
  updatedAt: Date = new Date();
}
