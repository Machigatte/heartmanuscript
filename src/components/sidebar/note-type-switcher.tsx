"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Kbd } from "../ui/kbd"
import { useSidebarStore } from "@/stores/use-sidebar-store"

interface NoteTypeItem {
  type: number;
  name: string;
  logo: React.ElementType;
  description?: string;
}

export function NoteTypeSwitcher({
  noteTypes,
}: {
  noteTypes: NoteTypeItem[]
}) {
  const { isMobile } = useSidebar()
  const {selectedNoteType, setSelectedNoteType} = useSidebarStore();

  const activeNoteType = noteTypes.find(
    (item) => item.type === selectedNoteType
  )

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                {activeNoteType && (
                  <activeNoteType.logo className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeNoteType?.name}</span>
                <span className="truncate text-xs">{activeNoteType?.description}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              工作区
            </DropdownMenuLabel>
            {noteTypes.map((noteType, index) => (
              <DropdownMenuItem
                key={noteType.name}
                onClick={() => setSelectedNoteType(noteType.type)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <noteType.logo className="size-3.5 shrink-0" />
                </div>
                {noteType.name}
                <DropdownMenuShortcut>
                  <Kbd>Ctrl</Kbd>
                  <span>+</span>
                  <Kbd>{index + 1}</Kbd>
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
