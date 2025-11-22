"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar"
import { Note } from "@/types"
import { useAppStore } from "@/stores/use-app-store"
import NoteItem from "./note-item"
import { useNotes } from "@/hooks/use-notes"

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

export function NavNotes() {
  const { searchParams } = useAppStore();
  const { data: notes, isLoading } = useNotes(searchParams);

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
                  <NoteItem key={note.id} note={note}/>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          )
      )}
    </>
  )
}
