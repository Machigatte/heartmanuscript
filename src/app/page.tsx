"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function RecordInterface() {
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 左侧边栏 */}
      <aside className="w-64 border-r bg-white p-4">
        <h2 className="text-lg font-semibold mb-4">历史记录</h2>
        <ul className="space-y-2">
          <li className="text-sm text-gray-600 cursor-pointer hover:text-black">2025-09-01 周报</li>
          <li className="text-sm text-gray-600 cursor-pointer hover:text-black">2025-09-05 科研日记</li>
        </ul>
      </aside>

      {/* 右侧主内容 */}
      <main className="flex-1 flex flex-col">
        {/* 顶部栏 */}
        <div className="flex items-center justify-between px-6 py-3 border-b bg-white">
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
        </div>

        {/* 中间内容 */}
        <Card className="flex-1 m-6">
          <CardContent className="p-4">
            {mode === "weekly" && (
              <div className="space-y-4">
                <h3 className="font-semibold">工作安排</h3>
                <textarea className="w-full border rounded p-2" rows={3}></textarea>
                <h3 className="font-semibold">资料</h3>
                <textarea className="w-full border rounded p-2" rows={3}></textarea>
                <h3 className="font-semibold">结果</h3>
                <textarea className="w-full border rounded p-2" rows={3}></textarea>
              </div>
            )}
            {mode === "research" && (
              <div className="space-y-4">
                <h3 className="font-semibold">实验安排</h3>
                <textarea className="w-full border rounded p-2" rows={3}></textarea>
                <h3 className="font-semibold">代码</h3>
                <textarea className="w-full border rounded p-2" rows={3}></textarea>
                <h3 className="font-semibold">结果</h3>
                <textarea className="w-full border rounded p-2" rows={3}></textarea>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 底部功能按钮 */}
        <div className="flex items-center justify-between px-6 py-3 border-t bg-white">
          {/* 左侧设置按钮 */}
          <Button variant="ghost">
            <Settings className="w-5 h-5" />
          </Button>

          {/* 右侧三个功能按钮 */}
          <div className="flex gap-3">
            <Button variant="outline">更新</Button>
            <Button variant="outline">分析</Button>
            <Button variant="default">归档</Button>
          </div>
        </div>
      </main>
    </div>
  );
}