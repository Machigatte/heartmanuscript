"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// 大模型选项
export const modelOptions = [
  { value: "gpt-4", label: "GPT-4" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { value: "claude-3", label: "Claude 3" },
  { value: "gemini-pro", label: "Gemini Pro" },
];

interface SettingWrapperProps {
  onSaveSettings?: (settings: { model: string; apiKey: string }) => void;
}

export function SettingWrapper({ onSaveSettings }: SettingWrapperProps) {
  // 本地状态
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [apiKey, setApiKey] = useState("");
  
  // 保存设置
  const handleSaveSettings = () => {
    console.log("保存设置:", { selectedModel, apiKey });
    // 调用回调函数
    if (onSaveSettings) {
      onSaveSettings({ model: selectedModel, apiKey });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h3 className="font-medium">设置</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">选择大模型</label>
            <select 
              className="w-full p-2 border rounded-md"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {modelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">API Key</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="输入API Key"
            />
          </div>
          
          <Button onClick={handleSaveSettings} className="w-full">
            确认
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}