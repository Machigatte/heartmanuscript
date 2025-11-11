"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NoteSummary } from "@/models/NoteSummary";

interface NoteItemProps {
  item: NoteSummary;
  isSelected: boolean;
  onClick?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function NoteItem({
  item,
  isSelected,
  onClick,
  onDelete,
}: NoteItemProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div
      className={`group flex items-center gap-2 p-2 rounded-md cursor-pointer ${
        isSelected ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
      }`}
      onClick={() => {
        onClick?.(item.id);
      }}
    >
      <div className="flex-1 min-w-0">
        <span
          className="block truncate"
          style={{ maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {item.title}
        </span>
      </div>
      
      {onDelete && (
        <Popover open={showConfirm} onOpenChange={setShowConfirm}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 hover:bg-red-100 hover:text-red-600"
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
              <p className="text-sm">确定要删除这个笔记吗？</p>
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
                  onClick={(e) => {
                    e.stopPropagation();
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
