"use client"

import { Hotkey } from "@/components/common/hotkey";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useConfirmNavigation } from "@/hooks/use-confirm-navigation";
import { useAppStore } from "@/stores/use-app-store";
import { NotebookPen } from "lucide-react";
import { usePathname } from "next/navigation";

const action = {
  title: "新笔记",
  icon: NotebookPen,
  link: '/notes/draft'
}

export const NewDraftAction: React.FC = () => {
  const pathname = usePathname();
  const isDraft = pathname === `/notes/draft`;

  const { isDirty } = useAppStore();
  const { confirmNavigation } = useConfirmNavigation(isDirty);

  const handleClick = () => {
    confirmNavigation(action.link);
  }

  return (
    <SidebarMenuItem key={action.title}>
      <SidebarMenuButton tooltip={action.title} isActive={isDraft} onClick={handleClick}>
        {action.icon && <action.icon />}
        <span>{action.title}</span>
        <Hotkey
          shortcuts={[
            { keyTrigger: "n", altKey: true }, // 显示 ⌘ + N 或 Ctrl + N
          ]}
          onTrigger={handleClick}
        />
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
