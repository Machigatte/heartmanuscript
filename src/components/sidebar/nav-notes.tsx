"use client"

import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  useSidebar,
} from "@/components/ui/sidebar"
import { Note } from "@/types"
import Link from "next/link"
import { useSidebarStore } from "@/stores/use-sidebar-store"
import { useDeleteNote } from "@/hooks/use-note-mutations"

function dayDiff(date: Date) {
  const now = new Date()
  const d = new Date(date)
  return Math.floor(
    (now.setHours(0, 0, 0, 0) - d.setHours(0, 0, 0, 0)) /
      (24 * 60 * 60 * 1000)
  )
}

const GROUPS = [
  {
    label: "今天",
    key: "today",
    match: (note: Note) => dayDiff(note.updatedAt) === 0,
  },
  {
    label: "昨天",
    key: "yesterday",
    match: (note: Note) => dayDiff(note.updatedAt) === 1,
  },
  {
    label: "前天",
    key: "twoDaysAgo",
    match: (note: Note) => dayDiff(note.updatedAt) === 2,
  },
  {
    label: "最近一周内",
    key: "thisWeek",
    match: (note: Note) => {
      const diff = dayDiff(note.updatedAt)
      return diff >= 3 && diff < 7
    },
  },
  {
    label: "最近一月内",
    key: "thisMonth",
    match: (note: Note) => {
      const diff = dayDiff(note.updatedAt)
      return diff >= 7 && diff < 30
    },
  },
  {
    label: "更早",
    key: "older",
    match: () => true,
  },
]


export function NavNotes({
  notes,
  isLoading,
}: {
  notes?: Note[]
  isLoading?: boolean
}) {
  const { isMobile } = useSidebar()
  const { selectedNoteId, setSelectedNoteId } = useSidebarStore()
  const { mutate: deleteNote } = useDeleteNote()

  const handleDelete = (note: Note) => {
    deleteNote(note)
  }

  // 加载骨架
  if (isLoading) {
    return (
      <SidebarMenu>
        {Array.from({ length: 5 }).map((_, i) => (
          <SidebarMenuItem key={i}>
            <SidebarMenuSkeleton />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    )
  }

  // 按 GROUPS 顺序把 notes 放入对应组
  const groups = GROUPS.map((g) => ({
    ...g,
    notes: [] as Note[],
  }))

  notes?.forEach((note) => {
    const group = groups.find((g) => g.match(note))!
    group.notes.push(note)
  })

  // 每组内部按 updatedAt 降序
  groups.forEach((g) => {
    g.notes.sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    )
  })

  return (
    <>
      {groups.map(
        (group) =>
          group.notes.length > 0 && (
            <SidebarGroup
              key={group.key}
              className="group-data-[collapsible=icon]:hidden"
            >
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

              <SidebarMenu>
                {group.notes.map((note) => (
                  <SidebarMenuItem key={note.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={selectedNoteId === note.id}
                    >
                      <Link href={`/notes/${note.id}`}>
                        {note.title}
                      </Link>
                    </SidebarMenuButton>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction showOnHover>
                          <MoreHorizontal />
                          <span className="sr-only">更多</span>
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        className="w-48 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align={isMobile ? "end" : "start"}
                      >
                        <Link href={`/notes/${note.id}`}>
                          <DropdownMenuItem>
                            <Folder className="text-muted-foreground" />
                            <span>打开笔记</span>
                          </DropdownMenuItem>
                        </Link>

                        <DropdownMenuItem>
                          <Forward className="text-muted-foreground" />
                          <span>创建副本</span>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => handleDelete(note)}
                        >
                          <Trash2 className="text-muted-foreground" />
                          <span>删除笔记</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          )
      )}
    </>
  )
}
