"use client"

import {
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar"

interface EditorActionsProps {
  children: React.ReactNode; // 用于插入 Action 组件和内容
}

export const NavActions: React.FC<EditorActionsProps> = ({ children }) => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {children}
      </SidebarMenu>
    </SidebarGroup>
  )
}
