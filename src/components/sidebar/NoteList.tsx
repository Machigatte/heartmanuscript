import { NoteSummary } from "@/models/NoteSummary";
import { NoteItem } from "./NoteItem";

interface NoteListProps {
  notes: NoteSummary[];
  currentNoteId: number | null;
  onSelect: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function NoteList({ notes, currentNoteId, onSelect, onDelete }: NoteListProps) {
  return (
    <ul className="space-y-1">
      {notes.length > 0 ? (
        notes.map((item) => (
          <NoteItem
            key={item.id}
            item={item}
            isSelected={currentNoteId === item.id}
            onClick={() => onSelect(item.id)}
            onDelete={onDelete ? () => onDelete(item.id) : undefined}
          />
        ))
      ) : (
        <li className="text-sm text-gray-500 text-center p-4">
          暂无记录，点击右上角加号添加
        </li>
      )}
    </ul>
  );
}
