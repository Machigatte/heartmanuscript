import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { useRecordEditor } from "../containers/RecordEditorContext";
import { useEffect, useState } from "react";

export function EditorHeader() {
  const { record, setRecord } = useRecordEditor();
  const [date, setDate] = useState<Date>(new Date(record.updatedAt));
  const [currentTime, setCurrentTime] = useState<string>();
  const isArchived = Boolean(record.archivedAt);

  useEffect(() => {
    setDate(new Date(record.updatedAt));
  }, [record.updatedAt]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString("zh-CN"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white">
      {/* 左侧：标题 */}
      <input
        value={record.title}
        onChange={(e) => setRecord(r => {
          if (isArchived) return r; // 已归档的记录禁止修改标题
          return { ...r, title: e.target.value }
        })}
        className="text-xl font-bold border-none outline-none bg-transparent"
      />

      {/* 中间：实时时间显示（带悬浮提示和点击选择） */}
      <TooltipProvider>
        <Tooltip>
          <Popover>
            <TooltipTrigger>
              <PopoverTrigger asChild>
                <div className="text-gray-600 font-mono text-sm cursor-pointer">
                  {currentTime}
                </div>
              </PopoverTrigger>
            </TooltipTrigger>
          </Popover>
          <TooltipContent>
            <p>再坚持一下吧</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* 右侧：模式切换 */}
      <div className="flex gap-3 ml-6">
        {[
          { value: 1 as const, label: "周报日报" },
          { value: 2 as const, label: "科研日记" },
          { value: 3 as const, label: "随想" }
        ].map(type => (
          <Button
            key={type.value}
            variant={record.noteType === type.value ? "default" : "outline"}
            onClick={() => setRecord(r => {
              if (isArchived) return r; // 已归档的记录禁止修改类型
              return {...r, noteType: type.value }
            })}
          >
            {type.label}
          </Button>
        ))}
      </div>
    </header>
  );
}