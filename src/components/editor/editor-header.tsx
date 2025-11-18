import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { TimestampDisplay } from "@/components/editor/timestamp-display";
import { useEditorContext } from "./editor-context";
import { NoteType } from "@/types/api";

export function EditorHeader() {
  const { currentNote, isDraft, isDirty, isArchived, updateField } = useEditorContext();

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white">
      {/* 左侧：标题 */}
      <div className="flex justify-between gap-3" style={{ width: "30%", overflow: "hidden" }}>
        <input
          value={currentNote?.title ?? ''}
          onChange={e => {updateField('title', e.target.value)}}
          className="truncate text-xl font-bold border-none outline-none bg-transparent"
          style={{
            minWidth: "4rem",
            maxWidth: "100%",
          }}
        />

        <div className="flex flex-nowrap gap-1">
          {/* 标题后 Badge */}
          {isDraft &&
            <Badge className="bg-gray-500 text-white dark:bg-gray-600">
              草稿
            </Badge>
          }
          {!isDraft && isDirty &&
            <Badge className="bg-blue-500 text-white dark:bg-blue-600">
              未保存
            </Badge>
          }
          {isArchived &&
            <Badge>已归档</Badge>
          }
        </div>
      </div>

      {/* 中间：实时时间显示（带悬浮提示和点击选择） */}
      <TimestampDisplay
        tooltipContent={<p>再坚持一下吧</p>}
      />

      {/* 右侧：模式切换 */}
      <div className="flex gap-3 ml-6">
        {[
          { value: 1 as NoteType, label: "工作周报" },
          { value: 2 as NoteType, label: "科研日记" },
          { value: 3 as NoteType, label: "随想" }
        ].map(type => (
          <Button
            key={type.value}
            variant={currentNote?.type === type.value ? "default" : "outline"}
            onClick={() => {
              if (!isArchived) {
                updateField('type', type.value)
              }
            }}
          >
            {type.label}
          </Button>
        ))}
      </div>
    </header>
  );
}
