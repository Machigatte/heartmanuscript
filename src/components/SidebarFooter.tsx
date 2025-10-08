import React from "react";
import { Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button";
import { SettingsContent } from "./SettingsContent";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";

export default function SidebarFooter() {
  return (
    <div className="w-full px-3 py-2 border-t border-gray-200">
      <div className="flex items-center justify-between">
        {/* 左边：头像 + 用户名 + 版本 */}
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Chalkim</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Chalkim</span>
            <span className="text-xs text-gray-500">Deepseek R1</span>
          </div>
        </div>

        {/* 右边：设置按钮 */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="p-2 rounded-full" variant="ghost" size="icon">
              <Settings className="w-5 h-5 text-gray-600" />
            </Button>
          </DialogTrigger>

          <SettingsContent />
        </Dialog>
      </div>
    </div>
  );
}
