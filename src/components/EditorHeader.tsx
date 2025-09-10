import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export function EditorHeader() {
  const [mode, setMode] = useState<"weekly" | "research">("weekly");
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState("记录标题");
  const [time, setTime] = useState<string>("");

  // 每秒更新时间（显示日期 + 时分秒）
  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

    // <header className="h-12 border-b flex items-center px-4 bg-gray-50">
    // <div className="flex items-center justify-between px-6 py-3 border-b bg-white">
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white">
      {/* 左侧：标题 */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-xl font-bold border-none outline-none bg-transparent"
      />

      {/* 中间：实时时间显示（带悬浮提示和点击选择） */}
      <TooltipProvider>
        <Tooltip>
          <Popover>
            <PopoverTrigger>

              <TooltipTrigger>
                <div className="text-gray-600 font-mono text-sm cursor-pointer">
                  {time}
                </div>
              </TooltipTrigger>

            </PopoverTrigger>
            <PopoverContent className="p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
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
          variant={mode === "weekly" ? "default" : "outline"}
          onClick={() => setMode("weekly")}
        >
          周报日报
        </Button>
        <Button
          variant={mode === "research" ? "default" : "outline"}
          onClick={() => setMode("research")}
        >
          科研日记
        </Button>
      </div>
    </header>
  );
}