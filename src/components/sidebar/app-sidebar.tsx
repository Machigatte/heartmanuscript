"use client"

import * as React from "react"
import {
  CalendarDays,
  Microscope,
  NotebookPen,
  NotebookTabs,
  PenLine,
  Search,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { NavNotes } from "./nav-notes"
import { NavActions } from "./nav-actions"
import { NoteTypeSwitcher } from "./note-type-switcher"
import { useNotes } from "@/hooks/use-notes"
import { useUser } from "@/hooks/use-user"

interface NoteTypeItem {
  type: number;
  name: string;
  logo: React.ElementType;
  description?: string;
}

const noteTypes: NoteTypeItem[] = [
  { type: 0, name: "全部", logo: NotebookTabs },
  { type: 1, name: "工作周报", logo: CalendarDays },
  { type: 2, name: "科研日记", logo: Microscope },
  { type: 3, name: "随想", logo: PenLine },
]

const navMain = [
  {
    title: "新笔记",
    url: "#",
    icon: NotebookPen,
    link: '/notes/draft'
  },
  {
    title: "搜索笔记",
    url: "#",
    icon: Search,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: notes, isLoading: isNotesLoading, isError, refetch } = useNotes();
  const { data: user, isLoading: isUserLoading} = useUser();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NoteTypeSwitcher noteTypes={noteTypes} />
      </SidebarHeader>
      <SidebarContent>
        <NavActions actions={navMain} />
        <NavNotes notes={notes} isLoading={isNotesLoading} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} isLoading={isUserLoading} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
