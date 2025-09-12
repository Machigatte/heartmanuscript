import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { useRecordEditor } from "../containers/RecordEditorContext";
import { useEffect, useState } from "react";

export function EditorHeader() {
  const { record, setRecord } = useRecordEditor();
  const [ date, setDate ] = useState<Date>(new Date(record.updatedAt));

  useEffect(() => {
    setDate(new Date(record.updatedAt));
  }, [record.updatedAt]);

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white">
      {/* 左侧：标题 */}
      <input
        value={record.title}
        onChange={(e) => setRecord(r => ({ ...r, title: e.target.value }))}
        className="text-xl font-bold border-none outline-none bg-transparent"
      />

      {/* 中间：实时时间显示（带悬浮提示和点击选择） */}
      <TooltipProvider>
        <Tooltip>
          <Popover>
            <PopoverTrigger>
              <TooltipTrigger>
                <div className="text-gray-600 font-mono text-sm cursor-pointer">
                  {record.updatedAt}
                </div>
              </TooltipTrigger>
            </PopoverTrigger>
            <PopoverContent className="p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setRecord(r => ({ ...r, date: d }))}
              />
            </PopoverContent>
          </Popover>
          <TooltipContent>
            <p>{date.toLocaleString("zh-CN")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* 右侧：模式切换 */}
      <div className="flex gap-3 ml-6">
        <Button
          variant={record.note_type === 1 ? "default" : "outline"}
          onClick={() => setRecord(r => ({ ...r, note_type: 1 }))}
        >
          周报日报
        </Button>
        <Button
          variant={record.note_type === 2 ? "default" : "outline"}
          onClick={() => setRecord(r => ({ ...r, note_type: 2 }))}
        >
          科研日记
        </Button>
      </div>
    </header>
  );
}