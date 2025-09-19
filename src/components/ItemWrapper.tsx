"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RecordData } from "@/dataManager";

interface ItemWrapperProps {
  item: RecordData;
  isSelected: boolean;
  onClick: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ItemWrapper({
  item,
  isSelected,
  onClick,
  onDelete,
}: ItemWrapperProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
        isSelected ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
      }`}
      onClick={(e) => {
        // 阻止删除按钮的点击事件冒泡
        if (!(e.target as HTMLElement).closest('button')) {
          onClick(item.id);
          e.stopPropagation(); // 确保事件不会冒泡到其他元素
        }
      }}
    >
      <div className="flex-1 min-w-0">
        <span className="truncate">{item.title || "未命名记录"}</span>
      </div>
      
      {onDelete && isSelected && (
        <Popover open={showConfirm} onOpenChange={setShowConfirm}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-red-100 hover:text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirm(true);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-3" align="end">
            <div className="space-y-2">
              <p className="text-sm">确定要删除这条记录吗？</p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowConfirm(false)}
                >
                  取消
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    onDelete?.(item.id);
                    setShowConfirm(false);
                  }}
                >
                  删除
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}