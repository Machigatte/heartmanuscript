import React from "react";
import { Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { SettingsContent } from "../settings/SettingsContent";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { useUser } from "@/hooks/useUser";
import md5 from "md5";
import { Skeleton } from "../ui/skeleton";

export function UserArea() {
  const { data: user, isLoading } = useUser();

  function getGravatar(email: string , size = 80) {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=${size}`;
  }

  const username = user?.profile?.nickname ?? "Orinote User";
  const email = user?.profile?.email;
  const avatarUrl = email ? getGravatar(email) : undefined;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {/* 左边：头像 + 用户名 + 版本 */}
        <div className="flex items-center space-x-3">
          <Avatar>
            {isLoading ? (
              <Skeleton className="h-12 w-12 rounded-full" />
            ) : (
              <>
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>{username.slice(0, 2)}</AvatarFallback>
              </>
            )}
          </Avatar>
          <div className="flex flex-col">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-3 w-[100px]" />
                <Skeleton className="h-3 w-[150px]" />
              </div>
            ) : (
              <>
                <span className="text-sm font-medium text-gray-900">{username}</span>
                <span className="text-xs text-gray-500">ここはなにもないよ</span>
              </>
            )}
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
