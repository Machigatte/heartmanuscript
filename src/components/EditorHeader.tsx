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
        onChange={(e) => setRecord(r => ({ ...r, title: e.target.value }))}
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
        <Button
          variant={record.noteType === 1 ? "default" : "outline"}
          onClick={() => setRecord(r => ({ ...r, noteType: 1 }))}
        >
          周报日报
        </Button>
        <Button
          variant={record.noteType === 2 ? "default" : "outline"}
          onClick={() => setRecord(r => ({ ...r, noteType: 2 }))}
        >
          科研日记
        </Button>

        <Button
          variant={record.noteType === 3 ? "default" : "outline"}
          onClick={() => setRecord(r => ({ ...r, noteType: 3 }))}
        >
          随想
        </Button>
      </div>
    </header>
  );
}